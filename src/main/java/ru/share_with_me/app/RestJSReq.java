package ru.share_with_me.app;

import java.io.IOException;
import java.io.PrintWriter;

import java.sql.*;
import com.google.gson.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;

public class RestJSReq extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request,
                    HttpServletResponse response) throws IOException, ServletException {
        // code
        String user_token = (String) request.getParameter("token");
        String video_id = (String) request.getParameter("video_id");
        String query = "INSERT INTO rooms (owner_token,video_id) VALUES ('" + user_token + "','" + video_id + "')";
        
        Gson gson = new Gson();
        String jsonAns = "";

        // database stuff
        try {
            Class.forName("org.postgresql.Driver");
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/share_with_me", "postgres", "313103");

            Statement statement = conn.createStatement();
            statement.executeUpdate(query);

            // check if room created // TODO mark owner_token as PRIMARY_KEY
            query = "SELECT * FROM rooms WHERE owner_token='" + user_token + "'";
            ResultSet rs = statement.executeQuery(query);

            if (rs.next() == false) {
                jsonAns = gson.toJson(new NegativeResponse("SQL: room is not created"));
            } else {
                HttpSession session = request.getSession();
                // TODO: delete already exist room fron DB if token already defined in session (by this token)
                session.setAttribute("token", user_token);

                Integer id = (Integer) rs.getInt("id");
                jsonAns = gson.toJson(new PositiveResponse("room_id=" + id));
            }

            conn.close();
        }
        catch (ClassNotFoundException ex) { jsonAns = gson.toJson(new NegativeResponse("ClassNotFound: " + ex.getMessage())); }
        catch (SQLException ex) { jsonAns = gson.toJson(new NegativeResponse("SQLException: " + ex.getMessage())); }
        
        // feedback
        PrintWriter out = response.getWriter();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(jsonAns);
        out.flush();
    }


    public class PositiveResponse {
        private String answer;
        PositiveResponse(String a) { this.answer = a; }

        public String getAnswer() { return this.answer; }
    }

    public class NegativeResponse {
        private String error;
        NegativeResponse(String a) { this.error = a; }

        public String getError() { return this.error; }
    }
}