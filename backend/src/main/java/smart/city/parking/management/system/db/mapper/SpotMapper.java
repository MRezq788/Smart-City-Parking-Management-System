package smart.city.parking.management.system.db.mapper;

import org.springframework.stereotype.Component;
import smart.city.parking.management.system.db.dtos.ReservationDTO;
import smart.city.parking.management.system.db.dtos.SpotDTO;
import smart.city.parking.management.system.db.models.parking_spot;

import java.util.List;

@Component
public class SpotMapper {

    public SpotDTO spotToDTO(parking_spot mySpot, List<ReservationDTO> reservations){

        SpotDTO dto = new SpotDTO();

        dto.setSpot_id(mySpot.getSpot_id());
        dto.setType(mySpot.getType());
        dto.setStatus(mySpot.getStatus());
        dto.setReservations(reservations);

        return dto;
    }
}
