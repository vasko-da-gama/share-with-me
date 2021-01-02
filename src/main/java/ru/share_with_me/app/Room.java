package ru.share_with_me.app;

import java.io.IOException;
import java.io.PrintWriter;

import ru.share_with_me.app.ini_parser.IniParser;

import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;

public class Room extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,
                    HttpServletResponse response) throws IOException, ServletException {
        // code

        HttpSession session = request.getSession();
        String user_token = (String) session.getAttribute("token");

        // GET ROOM_ID
        String room_id = request.getParameter("id");
        if (room_id == null) {
            request.getRequestDispatcher("not_found.jsp").forward(request, response);
            return;
        }

        // generate sql query
        String query = "SELECT video_id, owner_token FROM rooms WHERE id='"+ room_id +"'";
        
        // execute query
        try {
            Class.forName("org.postgresql.Driver");

            IniParser configs = new IniParser();
            Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:"+ configs.getParameter("postgre_port") +"/"+ configs.getParameter("database_name"),
                configs.getParameter("database_user"), configs.getParameter("database_password")
            );

            Statement statement = conn.createStatement();

            ResultSet rs = statement.executeQuery(query);
            if (rs.next() == false) {
                request.getRequestDispatcher("not_found.jsp").forward(request, response);
                return;
            }
            String video_id = rs.getString("video_id");
            String check_token = rs.getString("owner_token");
            request.setAttribute("video_id", video_id);
            request.setAttribute("room_id", room_id);


            if (user_token != null && check_token.equals(user_token)) {
                request.getRequestDispatcher("host_player.jsp").forward(request, response);
            } else {
                request.getRequestDispatcher("guest_player.jsp").forward(request, response);
            }
        } catch(SQLException | ClassNotFoundException ex) {
            System.out.println(ex.getMessage());
            request.getRequestDispatcher("not_found.jsp").forward(request, response);
        }
        

        // request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}