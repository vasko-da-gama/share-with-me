<%@ page pageEncoding="UTF-8" contentType="text/html" isELIgnored="false" %>
<html>
    <head>
        <link rel="stylesheet" href="resources/style.css" type="text/css">
        <script type="text/javascript" src="resources/scripts/index_scripts.js"></script>
    </head>
    <body>
        <div id="left_side">
            <div id="room_create">
                <h1>Share With Me</h1>
                <p>Смотрите любимые видеоролики вместе с друзьями</p>
                <!-- TODO: replace this with form -->
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