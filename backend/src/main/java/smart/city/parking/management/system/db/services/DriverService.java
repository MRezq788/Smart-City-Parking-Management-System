package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.dtos.DriverAccountDTO;
import smart.city.parking.management.system.db.dtos.LotDTO;
import smart.city.parking.management.system.db.dtos.ReservationDTO;
import smart.city.parking.management.system.db.dtos.SpotDTO;
import smart.city.parking.management.system.db.enums.SpotStatus;
import smart.city.parking.management.system.db.mapper.LotMapper;
import smart.city.parking.management.system.db.mapper.ReservationMapper;
import smart.city.parking.management.system.db.mapper.SpotMapper;
import smart.city.parking.management.system.db.models.*;
import smart.city.parking.management.system.db.repositories.DriverRepository;
import smart.city.parking.management.system.db.repositories.LotRepo;
import smart.city.parking.management.system.db.repositories.ReservationRepo;
import smart.city.parking.management.system.db.repositories.SpotRepo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {

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


    private final DriverRepository driverRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public int addDriver(DriverAccountDTO dto) {
        String encodedPassword = "{bcrypt}"+ passwordEncoder.encode(dto.password());
        
        Account account = new Account(0, dto.username(), encodedPassword, dto.fullName(), dto.role());
        Driver driver = new Driver(0, 0, dto.plateNumber(), dto.paymentMethod(), 0, false);

        return driverRepository.addDriverAndAccount(account, driver);
    }

    public List<LotDTO> getAllLots() {

        List<parking_lot> lots = lotRepo.findAllLots();
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

    public void addReservation(reservation res) {
        reservationRepo.addReservation(res);
        parking_spot spot = spotRepo.findSpotById(res.getSpot_id());
        if(spot != null){
            spot.setStatus(SpotStatus.reserved);
            spotRepo.updateSpot(spot);
        }
    }
}
