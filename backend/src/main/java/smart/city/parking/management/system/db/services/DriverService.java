package smart.city.parking.management.system.db.services;

import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.repositories.DriverRepository;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public int addDriver(int accountId, String plateNumber, String paymentMethod, int penaltyCounter, boolean isBanned) {
        return driverRepository.addDriver(accountId, plateNumber, paymentMethod, penaltyCounter, isBanned);
    }
}
