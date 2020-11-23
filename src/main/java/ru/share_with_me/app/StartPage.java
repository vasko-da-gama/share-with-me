package ru.share_with_me.app;

import java.io.IOException;
import java.io.PrintWriter;

import java.sql.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class StartPage extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,
                    HttpServletResponse response) throws IOException, ServletException {
        // code

        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}