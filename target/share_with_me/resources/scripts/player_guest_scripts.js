/* HOST API */
/* INITIALIZE YOUTUBE API -> YOUTUBEAPI INITIALIZED */

const   UNSTARTED = -1,
        ENDED = 0,
        PLAYING = 1,
        PAUSED = 2,
        BUFFERING = 3;

var player;
var video_id;
function onYouTubeIframeAPIReady() {

    video_id = document.getElementById("player_main").getAttribute("data-video");

    player = new YT.Player('player', {
        height: '423', // 360
        width: '752', // 640
        videoId: video_id, // 'J0AjtsUCh34'
        playerVars: { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'fs': 1, 'autohide':1,'wmode':'opaque', 'color':'white' },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange

        }
    });
}

var webSocket;
function onPlayerReady(e) {
    console.log("describtion of player:", e.target);

    // OPEN SOCKET
    let room_id = document.getElementById("player_main").getAttribute("data-room");
    webSocket = new WebSocket("ws://localhost:8081/share_with_me/roomsocket/" + room_id);

    webSocket.onopen = function(message){
        console.log("Connected..");
    };
    webSocket.onmessage = function(message){
        // TODO: implement set state
        let current_states = JSON.parse(message.data);
        console.log(current_states);
        if (current_states.error) {
            alert("Host disconnected");
            return;
        }

        // state_code: e.data,
        // time: e.target.getCurrentTime()

        switch (current_states.state_code) {
            case UNSTARTED: {} break;
            case PLAYING: {
            	if (player.getPlayerState() == PLAYING) {
                    console.log("seek to", current_states.time);
                    player.seekTo(current_states.time);
                } else {
                	console.log("seek to", current_states.time);
                    player.playVideo();
                    player.seekTo(current_states.time);
                } 
                console.log("seek to", current_states.time);
            } break;
            case BUFFERING:
            case PAUSED: {
                if (player.getPlayerState() == PLAYING)
                    player.pauseVideo();
            } break;
            case ENDED: {
                alert("Thank you for watching this video with our application");
            }
        }
    };
    webSocket.onclose = function(message){ console.log("Connection closed"); };
    webSocket.onerror = function(message){ console.log("Smth wrong: ", message); };

    // e.target.playVideo();

    // document.getElementById("move_to_button").addEventListener('click', function (event) {
    //     console.log('clicked on button');
    //     e.target.seekTo(321.050284);
    // });
}

var done = false;
function onPlayerStateChange(e) {
    // if (done === false) {
    //     console.log("Available player states:", YT.PlayerState);
    //     done = true;
    // }

    // let current_states = {
    //     state_code: e.data,
    //     time: e.target.getCurrentTime()
    // };

    // console.log("current states", current_states);
    // webSocket.send(JSON.stringify(current_states));

    // if (e.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}

function stopVideo() {
    player.stopVideo();
}

/* YOUTUBEAPI INITIALIZED */


document.addEventListener("DOMContentLoaded", function () {
    // synchronized
    document.getElementById("synchronized").addEventListener("click", function () {
    	webSocket.send(JSON.stringify({ask: 'give me current state'}));
        // setTimeout(() => {webSocket.send(JSON.stringify({ask: 'give me current state'}));}, 1000);
        player.playVideo();
    });
});
