package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.dtos.LotDTO;
import smart.city.parking.management.system.db.dtos.ReservationDTO;
import smart.city.parking.management.system.db.dtos.SpotDTO;
import smart.city.parking.management.system.db.enums.SpotStatus;
import smart.city.parking.management.system.db.mapper.LotMapper;
import smart.city.parking.management.system.db.mapper.ReservationMapper;
import smart.city.parking.management.system.db.mapper.SpotMapper;
import smart.city.parking.management.system.db.models.parking_lot;
import smart.city.parking.management.system.db.models.parking_spot;
import smart.city.parking.management.system.db.models.reservation;
import smart.city.parking.management.system.db.repositories.LotRepo;
import smart.city.parking.management.system.db.repositories.ReservationRepo;
import smart.city.parking.management.system.db.repositories.SpotRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManagerService {

    @Autowired
    LotRepo lotRepo;
    @Autowired
    SpotRepo spotRepo;
    @Autowired
    ReservationRepo reservationRepo;
    @Autowired
    ReservationMapper reservationMapper;
    @Autowired
    SpotMapper spotMapper;
    @Autowired
    LotMapper lotMapper;

    public List<LotDTO> getAllLots(int id) {

        List<parking_lot> lots = lotRepo.findByManagerId(id);
        List<LotDTO> lotsDTO = new ArrayList<>();

        for (parking_lot lot : lots) {

            List<parking_spot> spots = spotRepo.findAllSpotsByLotId(lot.getLot_id());
            List<SpotDTO> spotsDTO = new ArrayList<>();

            for (parking_spot spot : spots) {

                List<reservation> reservations = reservationRepo.findAllReservationsBySpotId(spot.getSpot_id());

                List<ReservationDTO> reservationsDTO = reservations.stream()
                        .map(reservationMapper::reservationToDTO)
                        .collect(Collectors.toList());

                SpotDTO spotDTO = spotMapper.spotToDTO(spot, reservationsDTO);
                spotsDTO.add(spotDTO);
            }
            LotDTO lotDTO = lotMapper.lotToDTO(lot, spotsDTO);
            lotsDTO.add(lotDTO);
        }
        return lotsDTO;
    }

    public Boolean updateSpot(parking_spot mySpot) {
        parking_spot spot = spotRepo.findSpotById(mySpot.getSpot_id());
        if(spot == null) return false;
        spot.setStatus(mySpot.getStatus());
        spot.setType(mySpot.getType());
        spotRepo.updateSpot(spot);
        return true;
    }
    public Boolean deleteReservation(ReservationDTO dto){
        if(reservationRepo.findReservationById(dto.getReservation_id()) == null) return false;

        reservationRepo.deleteReservationById(dto.getReservation_id());
        return true;
    }

    public void addLot(LotDTO dto) {
        try {
            parking_lot lot = new parking_lot();
            lot.setManager_id(dto.getManager_id());
            lot.setName(dto.getName());
            lot.setCapacity(dto.getCapacity());
            lot.setLatitude(dto.getLatitude());
            lot.setLongitude(dto.getLongitude());
            lot.setOriginal_price(dto.getOriginal_price());
            lot.setDisabled_discount(dto.getDisabled_discount());
            lot.setEv_fees(dto.getEv_fees());
            lot.setDynamic_weight(dto.getDynamic_weight());
            int id = lotRepo.addLot(lot);
            List<SpotDTO> spots = dto.getSpots();
            for (SpotDTO spotDTO : spots) {
                parking_spot ps = new parking_spot();
                ps.setLot_id(id);
                ps.setType(spotDTO.getType());
                ps.setStatus(SpotStatus.available);
                spotRepo.addSpot(ps);
            }
        } catch (Exception e){
            System.err.println("Error in addLot service method 2: " + e.getMessage());
            throw e; // Re-throw the exception to be caught by the controller
        }
    }
}
