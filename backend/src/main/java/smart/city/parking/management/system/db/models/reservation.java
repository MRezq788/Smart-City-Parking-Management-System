package smart.city.parking.management.system.db.models;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import java.sql.Date;

@Component
@Scope("prototype")
@Data
public class reservation {
    private int reservation_id;
    private int spot_id;
    private int driver_id;
    private int start_hour;
    private int duration;
    private Date date;
    private boolean is_arrived;
    private boolean is_notified;
}
