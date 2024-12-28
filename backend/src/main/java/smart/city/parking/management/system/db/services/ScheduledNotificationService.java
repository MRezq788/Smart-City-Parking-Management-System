package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.enums.SpotStatus;
import smart.city.parking.management.system.db.models.Notification;
import smart.city.parking.management.system.db.models.parking_spot;
import smart.city.parking.management.system.db.models.reservation;
import smart.city.parking.management.system.db.repositories.*;

import java.time.LocalDateTime;
import java.util.List;

@EnableScheduling
@Service
public class ScheduledNotificationService {

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ReservationRepo reservationRepo;
    @Autowired
    private SpotRepo spotRepo;
    @Autowired
    private LotRepo lotRepo;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private NotificationHandler notificationHandler;

    @Scheduled(cron = "0 * * * * ?")
    public void checkReservationExpiry() throws Exception {
        List<reservation> activeReservations = reservationRepo.findActiveReservations();

        for (reservation r : activeReservations) {
            long currentTime = System.currentTimeMillis();
            if (currentTime >= (r.getStart_hour() + r.getDuration()) - 600000 && !r.is_notified()) { // 10 minutes before expiry
                //notificationService.sendTimeExpiryReminder(reservation.getUserId());
                Notification notification = new Notification();
                notification.setAccountId(driverRepository.findDriverById(r.getDriver_id()).accountId());
                notification.setMessage("Your reservation is about 10 minutes to expire");
                notification.setTimestamp(LocalDateTime.now());
                notificationHandler.sendNotification(notification);
                r.set_notified(true); // Mark as notified
                reservationRepo.updateReservation(r);
                System.out.println("Notification sent to driver: " + r.getDriver_id());
            }

            // Check 1 minute before expiry and spot status
            if (currentTime >= (r.getStart_hour() + r.getDuration() - 60000) && !r.is_arrived()) { // minute before expiry
                parking_spot spot = spotRepo.findSpotById(r.getSpot_id());
                String spotStatus = spot.getStatus().toString();
                if (!"occupied".equalsIgnoreCase(spotStatus)) { // If spot is not occupied
                    Notification notification = new Notification();
                    notification.setAccountId(driverRepository.findDriverById(r.getDriver_id()).accountId());
                    notification.setMessage("You didn't show up at your reservation time. Your penalty counter is"
                            +driverRepository.findDriverById(r.getDriver_id()).penaltyCounter()
                            +". If it reaches 5 you will be banned.");
                    notification.setTimestamp(LocalDateTime.now());
                    notificationHandler.sendNotification(notification);
                    r.set_notified(true); // Mark as notified
                    reservationRepo.updateReservation(r);

                    Notification managerNotification = new Notification();
                    managerNotification.setAccountId(lotRepo.findLotById(spot.getLot_id()).getManager_id());
                    managerNotification.setMessage("Driver with ID " + r.getDriver_id()
                            + " has a new penalty!");
                    managerNotification.setTimestamp(LocalDateTime.now());
                    notificationHandler.sendNotification(managerNotification);

                    System.out.println("Penalty notification sent to driver: " + r.getDriver_id());
                }
            }

        }

    }
}
