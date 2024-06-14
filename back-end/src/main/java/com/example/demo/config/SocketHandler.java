package com.example.demo.config;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SocketHandler extends TextWebSocketHandler {

    private static Map<String, WebSocketSession> userSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Получение имени пользователя из сессии (например, из Principal)
        String username = session.getPrincipal().getName(); // Или из session.getAttributes()
        userSessions.put(username, session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String username = session.getPrincipal().getName();
        userSessions.remove(username);
    }

    public static void sendMessageToUser(String username, String message) {
        WebSocketSession session = userSessions.get(username);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
