/* HOST API */
/* INITIALIZE YOUTUBE API -> YOUTUBEAPI INITIALIZED */

const   UNSTARTED = -1,
        ENDED = 0,
        PLAYING = 1,
        PAUSED = 2,
        BUFFERING = 3
        CUED = 5;

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

var webSocket = null;
function onPlayerReady(e) {
    console.log("describtion of player:", e.target);

    // OPEN SOCKET
    let room_id = document.getElementById("player_main").getAttribute("data-room");
    webSocket = new WebSocket("ws://localhost:8081/share_with_me/roomsocket/" + room_id);

    webSocket.onopen = function(message){
        console.log("Connected..");
    };
    webSocket.onmessage = function(message){
        let current_states = JSON.parse(message.data);
        console.log(current_states);
        if (current_states.error) {
            alert("Host disconnected");
            return;
        }

        switch (current_states.state_code) {
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
            case UNSTARTED:
            case BUFFERING:
            case PAUSED: {
            	console.log("current state: ", player.getPlayerState());
                if (player.getPlayerState() == PLAYING)
                    player.pauseVideo();
            } break;
            case ENDED: {}
        }
    };
    webSocket.onclose = function(message){ console.log("Connection closed"); };
    webSocket.onerror = function(message){ console.log("Smth wrong: ", message); };
}

var done = false;
function onPlayerStateChange(e) {}

function stopVideo() {
    player.stopVideo();
}

/* YOUTUBEAPI INITIALIZED */


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("synchronized").addEventListener("click", function () {
        if (webSocket) {
            webSocket.send(JSON.stringify({ask: 'give me current state'}));
            // setTimeout(() => {webSocket.send(JSON.stringify({ask: 'give me current state'}));}, 1000);
            let isCUED = player.getPlayerState() == CUED;
            player.playVideo();
            if (isCUED) player.pauseVideo();
        }
    });
});
