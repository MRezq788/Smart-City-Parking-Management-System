package smart.city.parking.management.system.db.mapper;

import org.springframework.stereotype.Component;
import smart.city.parking.management.system.db.dtos.LotDTO;
import smart.city.parking.management.system.db.dtos.SpotDTO;
import smart.city.parking.management.system.db.models.parking_lot;

import java.util.List;

@Component
public class LotMapper {

    public LotDTO lotToDTO(parking_lot myLot, List<SpotDTO> mySpots){

        LotDTO dto = new LotDTO();

        dto.setLot_id(myLot.getLot_id());
        dto.setManager_id(myLot.getManager_id());
        dto.setName(myLot.getName());
        dto.setCapacity(myLot.getCapacity());
        dto.setLatitude(myLot.getLatitude());
        dto.setLongitude(myLot.getLongitude());
        dto.setOriginal_price(myLot.getOriginal_price());
        dto.setDynamic_weight(myLot.getDynamic_weight());
        dto.setDisabled_discount(myLot.getDisabled_discount());
        dto.setEv_fees(myLot.getEv_fees());
        dto.setSpots(mySpots);

        return dto;
    }
}
