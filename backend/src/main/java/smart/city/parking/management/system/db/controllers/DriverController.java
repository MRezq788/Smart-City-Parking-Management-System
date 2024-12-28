package smart.city.parking.management.system.db.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smart.city.parking.management.system.db.dtos.DriverAccountDTO;
import smart.city.parking.management.system.db.dtos.LotDTO;
import smart.city.parking.management.system.db.dtos.ReservationDTO;
import smart.city.parking.management.system.db.models.reservation;
import smart.city.parking.management.system.db.services.DriverService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/drivers/add")
    public ResponseEntity<Integer> addDriver(@RequestBody DriverAccountDTO driverRequest) {
        try {
            int result = driverService.addDriver(driverRequest);
            if (result > 0) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
        catch (RuntimeException re) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/driver/parkinglots")
    public ResponseEntity<List<LotDTO>> getAllParkingLots() {

        try {
            List<LotDTO> lots = driverService.getAllLots();
            if(lots != null)
                return new ResponseEntity<>(lots, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/driver/reserve/spot")
    public ResponseEntity<Boolean> addReservation(@RequestBody reservation res) {

        try {
            driverService.addReservation(res);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
