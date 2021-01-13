<%@ page pageEncoding="UTF-8" contentType="text/html" isELIgnored="false" %>
<%@ page import="javax.servlet.http.HttpSession, java.util.*, java.sql.*, ru.share_with_me.app.ini_parser.IniParser" %>

<%
String user_token = (String) session.getAttribute("token");
String res_url = null;

if (user_token != null) {
	try{
		// get room_id
        Class.forName("org.postgresql.Driver");
        
        IniParser configs = new IniParser();
        Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:"+ configs.getParameter("postgre_port") +"/"+ configs.getParameter("database_name"),
                configs.getParameter("database_user"), configs.getParameter("database_password")
            );

	    Statement statement = conn.createStatement();

	    String query = "SELECT id FROM rooms WHERE owner_token='"+ user_token +"'";
	    ResultSet rs = statement.executeQuery(query);
	    if (rs.next() != false) {
	    	res_url = "/room?id=" + (Integer) rs.getInt("id");
		}
	}
	catch(SQLException | ClassNotFoundException ex) { System.out.println(ex.getMessage()); }
}

ArrayList<String> video_ids = new ArrayList<String>(){
        { add("oRybaB_vFu8"); add("5gIYE2UlahQ"); add("By3EAQZsi04"); add("JD5OVMxdC3A"); add("z6WkEDCbJiw"); }
    };

%>

<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="resources/style.css" type="text/css">
        <script type="text/javascript" src="resources/scripts/index_scripts.js"></script>
    </head>
    <body>
        
        <div id="central_block">


            <div id="left_side">
                <div id="room_create">
                    <h1>Share With Me</h1>
                    <p>Смотрите любимые видеоролики вместе с друзьями</p>
                    <%= (res_url != null ? "<p style='margin-top: 13px'>У вас уже есть <a href='"+ res_url +"'>комната</a></p>" : "") %>
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

                    <%
                        for (String i : video_ids) {
                            out.println("<div class='recomendation_iframe'><iframe width='752' height='423' src='https://www.youtube.com/embed/"+ i +"' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>");
                        }
                    %>
    
                </div>
            </div>



        </div>

    </body>
</html>