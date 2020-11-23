/* INITIALIZE YOUTUBE API -> YOUTUBEAPI INITIALIZED */

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '423', // 360
        width: '752', // 640
        videoId: 'J0AjtsUCh34',
        playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque', 'color':'white' },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange

        }
    });
}

function onPlayerReady(e) {
    console.log("describtion of player:", e.target);
    e.target.playVideo();

    document.getElementById("move_to_button").addEventListener('click', function (event) {
        console.log('clicked on button');
        e.target.seekTo(321.050284);
    });
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
    
    // if (e.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}

function stopVideo() {
    player.stopVideo();
}

/* YOUTUBEAPI INITIALIZED */


// document.addEventListener("DOMContentLoaded", function () {
    
// });
