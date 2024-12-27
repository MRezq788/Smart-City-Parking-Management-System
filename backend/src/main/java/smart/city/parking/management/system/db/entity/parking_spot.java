package smart.city.parking.management.system.db.entity;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import smart.city.parking.management.system.db.enums.SpotStatus;
import smart.city.parking.management.system.db.enums.SpotType;

@Component
@Scope("prototype")
@Data
public class parking_spot {

    private int spot_id;
    private int lot_id;
    private SpotType type;
    private SpotStatus status;
}
