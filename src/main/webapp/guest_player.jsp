<%@ page pageEncoding="UTF-8" contentType="text/html" isELIgnored="false" %>
<html>
    <head>
        <link rel="stylesheet" href="resources/style.css" type="text/css">
        <!-- <script src="https://www.youtube.com/iframe_api"></script> -->
        <script type="module" src="resources/scripts/player_guest_scripts.js"></script>
    </head>
    <body>
        
        <div id="player_body">

            <div id="player_header">
                <ul>
                    <li>Вернуться домой</li>
                </ul>
            </div>
            
            <div data-video="${video_id}" data-room="${room_id}" id="player_main">
                <div id="player"></div>

                <div id="player_info">

                    <button id="synchronized">Синхронизироваться с хостом</button>

                    <p>Поделитесь ссылкой с друзьями для того, чтобы они могли зайти в комнату: <br> http://share-with-me.ru/?room=1 </p>

                    <span>По вопросам дизайна (если вы человек со вкусом) пишите нам на почту</span>
                </div>
            </div>
            
        </div>
        
    </body>
</html>