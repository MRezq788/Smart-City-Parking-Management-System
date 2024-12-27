package smart.city.parking.management.system.db.dtos;

import lombok.Data;
import smart.city.parking.management.system.db.enums.SpotStatus;
import smart.city.parking.management.system.db.enums.SpotType;

import java.util.List;

@Data
public class SpotDTO {
    private int spot_id;
    private SpotType type;
    private SpotStatus status;

    private List<ReservationDTO> reservations;
}
