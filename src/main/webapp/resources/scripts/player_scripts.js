/* HOST API */
/* INITIALIZE YOUTUBE API -> YOUTUBEAPI INITIALIZED */

var player;
var video_id;
function onYouTubeIframeAPIReady() {

    video_id = document.getElementById("player_main").getAttribute("data-video");

    player = new YT.Player('player', {
        height: '423', // 360
        width: '752', // 640
        videoId: video_id, // 'J0AjtsUCh34'
        playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque', 'color':'white' },
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
        console.log(message.data);
        // send current data
        let current_states = {
            state_code: player.getPlayerState(),
            time: player.getCurrentTime()
        };

        webSocket.send(JSON.stringify(current_states));
    };
    webSocket.onclose = function(message){ console.log("Connection closed"); };
    webSocket.onerror = function(message){ console.log("Smth wrong"); };
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
    webSocket.send(JSON.stringify(current_states));
}

function stopVideo() {
    player.stopVideo();
}

/* YOUTUBEAPI INITIALIZED */