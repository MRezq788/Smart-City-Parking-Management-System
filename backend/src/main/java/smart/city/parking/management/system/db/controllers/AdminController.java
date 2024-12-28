package smart.city.parking.management.system.db.controllers;

import org.springframework.web.bind.annotation.*;
import smart.city.parking.management.system.db.dtos.AdminPageDriverDTO;
import smart.city.parking.management.system.db.dtos.AdminParkingLotDTO;
import smart.city.parking.management.system.db.services.AdminBanService;
import smart.city.parking.management.system.db.services.AdminParkingLotService;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminBanService adminBanService;
    private final AdminParkingLotService adminParkingLotService;

    public AdminController(AdminBanService adminBanService, AdminParkingLotService adminParkingLotService) {
        this.adminBanService = adminBanService;
        this.adminParkingLotService = adminParkingLotService;
    }

    @GetMapping("/drivers")
    public List<AdminPageDriverDTO> getAllDrivers(@RequestParam int page, @RequestParam int size) {
        return adminBanService.getAllDrivers(page, size);
    }

    @GetMapping("/drivers/search")
    public List<AdminPageDriverDTO> searchAccounts(@RequestParam String key, @RequestParam int page, @RequestParam int size) {
        return adminBanService.searchDrivers(key, page, size);
    }

    @PostMapping("/drivers/ban")
    public void banDriver(@RequestParam int driverId) {
        adminBanService.banDriver(driverId);
    }

    @PostMapping("/drivers/unban")
    public void unbanDriver(@RequestParam int driverId) {
        adminBanService.unbanDriver(driverId);
    }

    @GetMapping("lots")
    public List<AdminParkingLotDTO> getAllParkingLots(@RequestParam int page, @RequestParam int size) {
        return adminParkingLotService.getAllParkingLots(page, size);
    }

    @GetMapping("/lots/search")
    public List<AdminParkingLotDTO> searchParkingLots(@RequestParam String key, @RequestParam int page, @RequestParam int size) {
        return adminParkingLotService.searchParkingLots(key, page, size);
    }

    @DeleteMapping("/lots/{lotId}")
    public void deleteParkingLotById(@PathVariable int lotId) {
        adminParkingLotService.deleteParkingLotById(lotId);
    }
}

