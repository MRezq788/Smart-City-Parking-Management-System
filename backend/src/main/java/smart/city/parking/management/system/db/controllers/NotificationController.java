package smart.city.parking.management.system.db.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import smart.city.parking.management.system.db.models.Notification;
import smart.city.parking.management.system.db.services.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{accountId}")
    public List<Notification> getNotifications(@PathVariable int accountId) {
        return notificationService.getNotificationsByDriverId(accountId);
    }

}

