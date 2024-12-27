package smart.city.parking.management.system.db.models;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Scope("prototype")
@Data
public class Notification {
    private int notificationId;
    private int accountId;
    private String message;
    private LocalDateTime timestamp;
}
