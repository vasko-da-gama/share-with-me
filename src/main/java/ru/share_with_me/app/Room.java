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

        // TODO get video_id by request using room_id(get parameter)

        if (user_token != null) {
            request.getRequestDispatcher("host_player.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("guest_player.jsp").forward(request, response);
        }

        // request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}