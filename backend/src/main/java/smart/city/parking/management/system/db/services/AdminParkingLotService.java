package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.dtos.AdminParkingLotDTO;
import smart.city.parking.management.system.db.repositories.ParkingLotRepository;

import java.util.List;

@Service
public class AdminParkingLotService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;

    public List<AdminParkingLotDTO> getAllParkingLots(int page, int size) {
        return parkingLotRepository.findAllParkingLotsWithPages(page, size);
    }

    public List<AdminParkingLotDTO> searchParkingLots(String searchTerm, int page, int size) {
        return parkingLotRepository.searchParkingLots(searchTerm, page, size);
    }

    public void deleteParkingLotById(int lotId) {
        parkingLotRepository.deleteParkingLotById(lotId);
    }
}
