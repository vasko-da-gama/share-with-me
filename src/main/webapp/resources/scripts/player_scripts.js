/* HOST API */
/* INITIALIZE YOUTUBE API -> YOUTUBEAPI INITIALIZED */

import {playerObj} from './player/player.js';

let video_id = document.getElementById("player_main").getAttribute("data-video");
let playerVars = { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque', 'color':'white' };

let player_p = new playerObj(
	video_id, playerVars, onPlayerReady, onPlayerStateChange
);

function onPlayerReady(e) {
    console.log("describtion of player:", e.target);

    // OPEN SOCKET
    let room_id = document.getElementById("player_main").getAttribute("data-room");
    this.webSocket = new WebSocket("ws://localhost:8081/share_with_me/roomsocket/" + room_id);

    this.webSocket.onopen = function(message){
        console.log("Connected..");
    };
    this.webSocket.onmessage = function(message){
        console.log(message.data);
        // send current data
        let current_states = {
            state_code: e.target.getPlayerState(),
            time: e.target.getCurrentTime()
        };

        // this.webSocket.send(JSON.stringify(current_states));
        this.send(JSON.stringify(current_states));
    };
    this.webSocket.onclose = function(message){ console.log("Connection closed"); };
    this.webSocket.onerror = function(message){ console.log("Smth wrong"); };
}

var done = false;
function onPlayerStateChange(e) {
    if (done === false) {
        console.log("Available player states:", YT.PlayerState);
        done = true;
    }

    let current_states = {
        state_code: e.data,
        time: e.target.getCurrentTime()
    };

    console.log("current states", current_states);
    this.webSocket.send(JSON.stringify(current_states));
}

/* YOUTUBEAPI INITIALIZED */

document.addEventListener("DOMContentLoaded", function () {

	document.getElementById("new_video").addEventListener("click", function () {

		let input = document.getElementById("new_url");
		if (input.value === "") {
            alert("Enter URL");
            return;
        }

        let video_id = input.value.match(/watch\?v=\S*/)[0].split('=')[1];
        if (video_id.indexOf('&') > 0) video_id = video_id.slice(0, video_id.indexOf('&'));
        console.log("video_id", video_id);

        // send to guests new video_id
        player_p.webSocket.send(JSON.stringify({new_video_id: video_id}));

        // update room in database
        let room_id = document.getElementById("player_main").getAttribute("data-room");
        let param = "new_video_id=" + video_id + "&room_id=" + room_id;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/share_with_me/updateRoom', false);
        xhr.onload = function (e) {
            if (xhr.status != 200) {
                console.log("ERROR STATE", xhr.status + ': ' + xhr.statusText );
            } else {
                console.log( JSON.parse(xhr.responseText) );
                let res = JSON.parse(xhr.responseText);
                if (res.answer) {
                    console.log(res);
                }
            }
        };
        xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        xhr.send(param);
        // ...
        
        let pPlayer = player_p.getPlayer();
		pPlayer.loadVideoById(video_id);
	});
    
});


