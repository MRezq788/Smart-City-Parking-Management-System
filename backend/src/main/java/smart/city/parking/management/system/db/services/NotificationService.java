package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.models.Notification;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void saveNotification(Notification notification) {
        String sql = "INSERT INTO notification (account_id, message, timestamp) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, notification.getAccountId(), notification.getMessage(), notification.getTimestamp());
    }

    public List<Notification> getNotificationsByDriverId(int accountId) {
        String sql = "SELECT * FROM notification WHERE account_id = ? ORDER BY timestamp DESC";
        return jdbcTemplate.query(sql, new Object[]{accountId}, (rs, rowNum) -> {
            Notification notification = new Notification();
            notification.setNotificationId(rs.getInt("notification_id"));
            notification.setAccountId(rs.getInt("account_id"));
            notification.setMessage(rs.getString("message"));
            notification.setTimestamp(rs.getTimestamp("timestamp").toLocalDateTime());
            return notification;
        });
    }

}
