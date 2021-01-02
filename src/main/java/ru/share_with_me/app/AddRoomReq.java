package ru.share_with_me.app;

import ru.share_with_me.app.json_answers.*;
import ru.share_with_me.app.ini_parser.IniParser;

import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

import java.sql.*;
import com.google.gson.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;

public class AddRoomReq extends HttpServlet {
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

            IniParser configs = new IniParser();
            Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:"+ configs.getParameter("postgre_port") +"/"+ configs.getParameter("database_name"),
                configs.getParameter("database_user"), configs.getParameter("database_password")
            );

            Statement statement = conn.createStatement();
            statement.executeUpdate(query);

            // check if room created // TODO mark owner_token as PRIMARY_KEY
            query = "SELECT * FROM rooms WHERE owner_token='" + user_token + "'";
            ResultSet rs = statement.executeQuery(query);

            if (rs.next() == false) {
                jsonAns = gson.toJson(new NegativeResponse("SQL: room is not created"));
            } else {
                HttpSession session = request.getSession();
                session.setAttribute("token", user_token);
                session.setMaxInactiveInterval(60 * 60 * 24); // 24 hours

                Integer id = (Integer) rs.getInt("id"); // id of created room
                jsonAns = gson.toJson(new PositiveResponse("room_id=" + id));
            }

            conn.close();
        }
        catch (ClassNotFoundException ex) { jsonAns = gson.toJson(new NegativeResponse("ClassNotFound: " + ex.getMessage())); }
        catch (SQLException ex) { jsonAns = gson.toJson(new NegativeResponse("SQLException: " + ex.getMessage())); }
        catch (IOException ex) {
            System.out.println("Exception configuration: " + ex.getMessage());
            jsonAns = gson.toJson(new NegativeResponse("Configuration exception: " + ex.getMessage()));
        }
        
        // feedback
        PrintWriter out = response.getWriter();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(jsonAns);
        out.flush();
    }
}