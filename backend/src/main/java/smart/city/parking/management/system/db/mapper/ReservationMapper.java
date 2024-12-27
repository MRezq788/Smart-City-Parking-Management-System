package smart.city.parking.management.system.db.mapper;

import org.springframework.stereotype.Component;
import smart.city.parking.management.system.db.dtos.ReservationDTO;
import smart.city.parking.management.system.db.models.reservation;

@Component
public class ReservationMapper {
    public ReservationDTO reservationToDTO(reservation myReservation){

        ReservationDTO dto = new ReservationDTO();

        dto.setReservation_id(myReservation.getReservation_id());
        dto.setStart_hour(Integer.toString(myReservation.getStart_hour()));
        dto.setDuration(myReservation.getDuration());
        dto.setDate(myReservation.getDate());
        dto.set_arrived(myReservation.is_arrived());

        return dto;
    }
}
