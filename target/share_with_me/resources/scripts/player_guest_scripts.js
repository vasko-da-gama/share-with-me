/* HOST API */
/* INITIALIZE YOUTUBE API -> YOUTUBEAPI INITIALIZED */

import {playerObj} from './player/player.js';
import {js_configs} from './config.js';

const   UNSTARTED = -1,
        ENDED = 0,
        PLAYING = 1,
        PAUSED = 2,
        BUFFERING = 3,
        CUED = 5;



let video_id = document.getElementById("player_main").getAttribute("data-video");
let playerVars = { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'fs': 1, 'autohide':1,'wmode':'opaque', 'color':'white' };

var player_p = new playerObj(
	video_id, playerVars, onPlayerReady, onPlayerStateChange
);

function onPlayerReady(e) {
    console.log("describtion of player:", e.target);

    // OPEN SOCKET
    let room_id = document.getElementById("player_main").getAttribute("data-room");
    // this.webSocket = new WebSocket("ws://share-with-me:8081/roomsocket/" + room_id);
    this.webSocket = new WebSocket("ws://"+ js_configs.hostname +":"+ js_configs.port +"/roomsocket/" + room_id);

    this.webSocket.onopen = function(message){
        console.log("Connected..");
    };
    this.webSocket.onmessage = function(message){
        let current_states = JSON.parse(message.data);
        console.log(current_states);
        if (current_states.error) {
            alert("Host disconnected");
            return;
        }

        if (current_states.new_video_id) {
            console.log("change video to", current_states.new_video_id);
            e.target.loadVideoById(current_states.new_video_id);
            return;
        }

        switch (current_states.state_code) {
            case PLAYING: {
            	if (e.target.getPlayerState() == PLAYING) {
                    console.log("seek to", current_states.time);
                    e.target.seekTo(current_states.time);
                } else {
                	console.log("seek to", current_states.time);
                    e.target.playVideo();
                    e.target.seekTo(current_states.time);
                } 
                console.log("seek to", current_states.time);
            } break;
            case UNSTARTED:
            case BUFFERING:
            case PAUSED: {
            	console.log("current state: ", e.target.getPlayerState());
                if (e.target.getPlayerState() == PLAYING)
                    e.target.pauseVideo();
            } break;
            case ENDED: {}
        }
    };
    this.webSocket.onclose = function(message){ console.log("Connection closed"); };
    this.webSocket.onerror = function(message){ console.log("Smth wrong: ", message); };
}

var done = false;
function onPlayerStateChange(e) {}

/* YOUTUBEAPI INITIALIZED */


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("synchronized").addEventListener("click", function () {
        if (player_p.webSocket) {
            player_p.webSocket.send(JSON.stringify({ask: 'give me current state'}));
            // setTimeout(() => {webSocket.send(JSON.stringify({ask: 'give me current state'}));}, 1000);
            let pPlayer = player_p.getPlayer();
            let isCUED = pPlayer.getPlayerState() == CUED;
            pPlayer.playVideo();
            if (isCUED) pPlayer.pauseVideo();
        }
    });
});
