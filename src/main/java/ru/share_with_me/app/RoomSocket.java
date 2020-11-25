package ru.share_with_me.app;

import java.io.IOException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpointConfig;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.HandshakeResponse;
import javax.websocket.Session;
import javax.websocket.EndpointConfig;
import javax.servlet.http.HttpSession;

@ServerEndpoint(value = "/roomsocket/{room_id}", configurator = GetHttpSessionConfigurator.class)
public class RoomSocket {

    private String room_id;
    private Boolean isHost;

    // access to this map has only hosts by room_id
    // change arraylist( ArrayList<Session> ) to set (done)
    private static HashMap<String, HashSet<Session>> rooms;
    private static HashMap<String, Session> hosts;
    static {
        rooms = new HashMap<>();
        hosts = new HashMap<>();
    }

    private EndpointConfig config;

    @OnOpen
    public void onOpen(Session session, EndpointConfig config, @PathParam("room_id") String room_id) throws IOException {

        this.room_id = room_id;
        System.out.println("WebSocket opened");

        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        String user_token = (String) httpSession.getAttribute("token");
        this.isHost = (user_token != null);

        if (this.isHost) {
            System.out.println("Host connected");
            // create room guests list if not defined
            if (!rooms.containsKey(this.room_id)) {
                rooms.put(room_id, new HashSet<Session>());
            }
            hosts.put(room_id, session);
        } else {
            // add this session to session list in rooms[room_id]
            System.out.println("Guest connected");
            if (rooms.containsKey(this.room_id)) {
                HashSet<Session> sessions = rooms.get(room_id);
                sessions.add(session);
            }
        }

    }

    @OnClose
    public void onClose() throws IOException {
        System.out.println("WebSocket closed");
        HashSet<Session> sessions = rooms.get(this.room_id);
        if (this.isHost) {
            for (Session sess : sessions)
                if (sess.isOpen())
                    sess.getBasicRemote().sendText("{error: 'host unavailable'}");
            
            // delete info about room
            sessions = null;
            rooms.remove(this.room_id);
            hosts.remove(this.room_id);
        }
    }

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {
        // recieve messages from HOST & send to all guests
        System.out.println("Message recived: " + message);

        if (this.isHost) {
            // send updates to all peers
            HashSet<Session> sessions = rooms.get(this.room_id);
            for (Session sess : sessions)
                if (sess.isOpen())
                    sess.getBasicRemote().sendText(message);
        } else {
            // guest require current state
            hosts.get(this.room_id).getBasicRemote().sendText(message);
        }

        // session.getBasicRemote().sendText("{answer: 'socket is work'}");
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("Exception happening: " + throwable.getMessage());
    }
}