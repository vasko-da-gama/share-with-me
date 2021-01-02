package ru.share_with_me.app;

import ru.share_with_me.app.json_answers.*;
import ru.share_with_me.app.ini_parser.IniParser;

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

public class UpdateRoomReq extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request,
                    HttpServletResponse response) throws IOException, ServletException {
        // code
        String new_video_id = (String) request.getParameter("new_video_id");
        String room_id = (String) request.getParameter("room_id");

        String query = "UPDATE rooms SET video_id='"+ new_video_id +"' WHERE id=" + room_id;
        
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

            jsonAns = gson.toJson(new PositiveResponse("Updated to " + new_video_id));

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

}