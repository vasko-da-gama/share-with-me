<%@ page pageEncoding="UTF-8" contentType="text/html" isELIgnored="false" %>
<%
    String fontPath = request.getRealPath("/resources/20011.ttf");
%>
<html>
    <head>
        <link rel="stylesheet" href="resources/style.css" type="text/css">
        <!-- <style type="text/css"></style> -->
        <script type="text/javascript">
            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById("create_button").addEventListener("click", function (e) {
                    let input = document.getElementById("input_url");
                    if (input.value === "") {
                        input.style.borderRadius = "5px";
                        input.style.boxShadow = "0 0 5px red";
                    } else {
                        // watch\?v=\S*
                        let video_id = input.value.match(/watch\?v=\S*/)[0].split('=')[1];
                        if (video_id.indexOf('&') > 0) video_id = video_id.slice(0, video_id.indexOf('&'));

                        console.log(video_id);
                    }
                });
            });
        </script>
    </head>
    <body>
        <div id="left_side">
            <div id="room_create">
                <h1>Share With Me</h1>
                <p>Смотрите любимые видеоролики вместе с друзьями</p>
                <div id="room_create_button">
                    <input id="input_url" type="text" placeholder="Вставьте сюда URL" />
                    <button id="create_button">Создать комнату</button>
                </div>
            </div>
        </div>


        <div id="right_side">
            <div id="right_side_title">
                <h1>Рекомендуем Вам посмотреть:</h1>
            </div>
            <div id="recomendation_list">
                

                <div class="recomendation_iframe">
                    <iframe width="752" height="423" src="https://www.youtube.com/embed/J0AjtsUCh34" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="recomendation_iframe">
                    <iframe width="752" height="423" src="https://www.youtube.com/embed/AuuvsfhMz6Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="recomendation_iframe">
                    <iframe width="752" height="423" src="https://www.youtube.com/embed/MEIViUFeVSA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="recomendation_iframe">
                    <iframe width="752" height="423" src="https://www.youtube.com/embed/80eiIr7sJQ0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="recomendation_iframe">
                    <iframe width="752" height="423" src="https://www.youtube.com/embed/nUDapTfGA80" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>


            </div>
        </div>

    </body>
</html>