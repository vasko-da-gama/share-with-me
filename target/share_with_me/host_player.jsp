<%@ page pageEncoding="UTF-8" contentType="text/html" isELIgnored="false" %>
<html>
    <head>
        <link rel="stylesheet" href="resources/style.css" type="text/css">
        <!-- <script src="https://www.youtube.com/iframe_api"></script> -->
        <script type="module" src="resources/scripts/player_scripts.js"></script>
        <style>
            @media(max-width: 1921px) {
                body {
                    background: linear-gradient(0.25turn, #3f87a6, #d0fbaf, #f69d3c);
                }
            }
        </style>
    </head>
    <body>
        
        <div id="player_body">

            <div id="player_header">
                <ul>
                    <li><a href="/">Вернуться домой</a></li>
                </ul>
            </div>
            
            <div data-video="${video_id}" data-room="${room_id}" id="player_main">
                <div id="player"></div>

                <div id="player_info">

                    <div id="reload_video">
                        <input type="text" id="new_url" placeholder="URL нового видео" />
                        <button id="new_video">Загрузить новое видео</button>
                    </div>

                    <p>Поделитесь ссылкой с друзьями для того, чтобы они могли зайти в комнату</p>

                    <span>По вопросам дизайна (если вы человек со вкусом) пишите нам на почту</span>
                </div>
            </div>
            
        </div>
        
    </body>
</html>