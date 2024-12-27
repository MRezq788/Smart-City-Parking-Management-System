package smart.city.parking.management.system.db.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.dtos.DriverAccountDTO;
import smart.city.parking.management.system.db.models.Account;
import smart.city.parking.management.system.db.models.Driver;
import smart.city.parking.management.system.db.repositories.DriverRepository;

@Service
public class DriverService {

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
}
