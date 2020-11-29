
// onYouTubeIframeAPIReady must call this function

export function playerObj(
    video_id,
    playerVars,
    onPlayerReady,
    onPlayerStateChange
) {

    // fields
    this.webSocket = null;
    var player = null;

    // define here socket_path

    // private methods
    var onPlayerReady_p = onPlayerReady.bind(this);
    var onPlayerStateChange_p = onPlayerStateChange.bind(this);
    // public methods
    this.getPlayer = function () { return player; };

    // add YT iframe API
    let tag = document.createElement('script');
    let firstScriptTag = document.getElementsByTagName('script')[0];

    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function () {
    // function onYouTubeIframeAPIReady () {
        player = new YT.Player('player', {
            height: '423', // 360
            width: '752', // 640
            videoId: video_id, // 'J0AjtsUCh34'
            playerVars: playerVars,
            events: {
                'onReady': onPlayerReady_p,
                'onStateChange': onPlayerStateChange_p
            }
        });
    }
}
