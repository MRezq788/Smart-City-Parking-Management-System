package smart.city.parking.management.system.db.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smart.city.parking.management.system.db.dtos.LotDTO;
import smart.city.parking.management.system.db.dtos.ReservationDTO;
import smart.city.parking.management.system.db.models.parking_spot;
import smart.city.parking.management.system.db.services.ManagerService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;
    @GetMapping("/{id}/parkinglots")
    public ResponseEntity<List<LotDTO>> getAllParkingLots(@PathVariable int id) {

        try {
            List<LotDTO> lots = managerService.getAllLots(id);
            if(lots != null)
                return new ResponseEntity<>(lots, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/spot")
    public ResponseEntity<Boolean> updateSpot(@RequestBody parking_spot spot){

        try {
            if(managerService.updateSpot(spot)) return new ResponseEntity<>(HttpStatus.OK);;
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete/reservation")
    public ResponseEntity<Boolean> deleteReservation(@RequestBody ReservationDTO dto){

        try {
            if(managerService.deleteReservation(dto)) return new ResponseEntity<>(HttpStatus.OK);;
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/add/lot")
    public ResponseEntity<Boolean> addLot(@RequestBody LotDTO lot){

        try {
            managerService.addLot(lot);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            System.err.println("Error in addLot service method 1: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
