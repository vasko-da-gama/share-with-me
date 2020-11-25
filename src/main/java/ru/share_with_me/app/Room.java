package ru.share_with_me.app;

import java.io.IOException;
import java.io.PrintWriter;

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
        String query = "SELECT video_id FROM rooms WHERE id='"+ room_id +"'";
        
        // execute query
        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/share_with_me", "postgres", "313103");
            Statement statement = conn.createStatement();

            ResultSet rs = statement.executeQuery(query);
            if (rs.next() == false) {
                request.getRequestDispatcher("not_found.jsp").forward(request, response);
                return;
            }
            String video_id = rs.getString("video_id");
            request.setAttribute("video_id", video_id);
            request.setAttribute("room_id", room_id);


            if (user_token != null) {
                request.getRequestDispatcher("host_player.jsp").forward(request, response);
            } else {
                request.getRequestDispatcher("guest_player.jsp").forward(request, response);
            }
        }
        catch(ClassNotFoundException ex) { request.getRequestDispatcher("not_found.jsp").forward(request, response); }
        catch(SQLException ex) { request.getRequestDispatcher("not_found.jsp").forward(request, response); }
        

        // request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}