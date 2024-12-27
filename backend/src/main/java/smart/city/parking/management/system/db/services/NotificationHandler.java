package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import smart.city.parking.management.system.db.models.Notification;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.Map;

@Service
@Scope("singleton")
public class NotificationHandler extends TextWebSocketHandler {

    private final Map<Integer, WebSocketSession> sessions;
    private final ObjectMapper objectMapper;
    @Autowired
    private NotificationService notificationService;

    @Autowired
    public NotificationHandler(Map<Integer, WebSocketSession> sessions, ObjectMapper objectMapper) {
        this.sessions = sessions;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String query = session.getUri().getQuery();
        String accountId = query != null && query.contains("=") ? query.split("=")[1] : null;
        if (accountId != null) {
            sessions.put(Integer.parseInt(accountId), session);
            System.out.println("Account ID: " + accountId + " connected.");
        } else {
            System.err.println("Account ID not provided in query parameters");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.entrySet().removeIf(entry -> entry.getValue().equals(session));
        System.out.println("Session closed. Remaining sessions: " + sessions.size());
    }

    public void sendNotification(Notification notification) throws Exception {
        // Save notification to the database
        notificationService.saveNotification(notification);

        // Send notification via WebSocket
        WebSocketSession session = sessions.get(notification.getAccountId());
        if (session != null && session.isOpen()) {
            String payload = objectMapper.writeValueAsString(notification);
            session.sendMessage(new TextMessage(payload));
            System.out.println("Notification sent to account ID: " + notification.getAccountId());
        } else {
            System.err.println("No open session found for account ID: " + notification.getAccountId());
        }
    }
}
