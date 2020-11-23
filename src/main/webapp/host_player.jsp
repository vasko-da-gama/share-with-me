<%@ page pageEncoding="UTF-8" contentType="text/html" isELIgnored="false" %>
<html>
    <head></head>
    <body>
        <h2>HOST</h2>
        <p>Token: <%= request.getSession().getAttribute("token") %></p>
    </body>
</html>