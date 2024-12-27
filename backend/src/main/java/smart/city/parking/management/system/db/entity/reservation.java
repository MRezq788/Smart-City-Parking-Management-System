package smart.city.parking.management.system.db.entity;

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
}
