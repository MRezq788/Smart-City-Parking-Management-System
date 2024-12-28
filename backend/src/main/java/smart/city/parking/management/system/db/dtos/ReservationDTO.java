package smart.city.parking.management.system.db.dtos;

import lombok.Data;

import java.sql.Date;

@Data
public class ReservationDTO {
    private int reservation_id;
    private String start_hour;
    private int duration;
    private Date date;
    private boolean is_arrived;
}
