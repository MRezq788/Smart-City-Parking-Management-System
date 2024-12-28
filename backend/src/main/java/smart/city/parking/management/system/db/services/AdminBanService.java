package smart.city.parking.management.system.db.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.dtos.AdminPageDriverDTO;
import smart.city.parking.management.system.db.repositories.DriverRepository;

import java.util.List;

@Service
public class AdminBanService {

    @Autowired
    private DriverRepository driverRepository;

    public List<AdminPageDriverDTO> getAllDrivers(int page, int size) {
        return driverRepository.findAllDriversWithPages(page, size);
    }

    public List<AdminPageDriverDTO> searchDrivers(String searchTerm, int page, int size) {
        return driverRepository.searchDrivers(searchTerm, page, size);
    }

    public void banDriver(int driverId) {
        driverRepository.banDriver(driverId);
    }

    public void unbanDriver(int driverId) {
        driverRepository.unbanDriver(driverId);
    }
}
