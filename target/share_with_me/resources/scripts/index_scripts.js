document.addEventListener("DOMContentLoaded", function () {
    function generate_token (max, min) {
        // max, min - length
        let res = "", r = 0,
        length = Math.floor(Math.random() * (max - min) + min);

        for (let i = 0; i < length; i++) {
            r = Math.floor(Math.random() * (20 - 1) + 1);
            if (r % 2)
                res += String.fromCharCode(Math.floor(Math.random() * ('Z'.charCodeAt(0) - 'A'.charCodeAt(0)) + 'A'.charCodeAt(0)));
            else if (r < 10) res += r;
            else res += String.fromCharCode(Math.floor(Math.random() * ('z'.charCodeAt(0) - 'a'.charCodeAt(0)) + 'a'.charCodeAt(0)));
        }
        
        return res;
    }

    document.getElementById("create_button").addEventListener("click", function (e) {
        let input = document.getElementById("input_url");
        if (input.value === "") {
            input.style.borderRadius = "5px";
            input.style.boxShadow = "0 0 5px red";
        } else {
            // watch\?v=\S*
            let video_id = input.value.match(/watch\?v=\S*/)[0].split('=')[1];
            if (video_id.indexOf('&') > 0) video_id = video_id.slice(0, video_id.indexOf('&'));

            let base_room_info = {
                token: generate_token(20, 50),
                video_id: video_id
            };

            let params = [];
            for (var key in base_room_info) {
                params.push(key + "=" + base_room_info[key]);
            }
            let parReq = params.join('&');
            console.log(parReq);

            // send request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'addRoom', false);
            xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
            xhr.send(parReq);

            // parse result (for sync req)
            if (xhr.status != 200) {
                console.log("ERROR STATE", xhr.status + ': ' + xhr.statusText );
            } else {
                console.log( JSON.parse(xhr.responseText) );
                let res = JSON.parse(xhr.responseText);
                if (res.answer) {
                    let id = res.answer.split('=')[1];
                    let redirect_link = window.location.origin + "/share_with_me/room?id=" + id;
                    window.location.href = redirect_link;
                }
            }

            console.log(base_room_info);
        }
    });
});