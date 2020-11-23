package ru.share_with_me.app;

import java.io.IOException;
import java.io.PrintWriter;

import java.sql.*;
import com.google.gson.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RestJSReq extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request,
                    HttpServletResponse response) throws IOException, ServletException {
        // code
        // Response res = new Response("Your message recieved");
        Gson gson = new Gson();
        String jsonAns = gson.toJson(new Response("Your message recieved"));


        PrintWriter out = response.getWriter();
        // response.setContentType("application/json");
        // response.setCharacterEncoding("UTF-8");
        // out.write("{answer: 'it work'}");
        // out.flush();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(jsonAns);
        out.flush();
    }


    public class Response {
        private String answer;
        Response(String a) { this.answer = a; }

        public String getAnswer() { return this.answer; }
    }
}