package smart.city.parking.management.system.db.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smart.city.parking.management.system.db.models.Driver;
import smart.city.parking.management.system.db.services.DriverService;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/add")
    public ResponseEntity<Integer> addDriver(@RequestBody Driver driverRequest) {
        try {
            int result = driverService.addDriver(driverRequest.accountId(),
                    driverRequest.plateNumber(),
                    driverRequest.paymentMethod(),
                    driverRequest.penaltyCounter(),
                    driverRequest.isBanned());
            if (result > 0) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        catch (DuplicateKeyException de) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
