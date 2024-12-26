package smart.city.parking.management.system.db.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smart.city.parking.management.system.db.models.Account;
import smart.city.parking.management.system.db.services.SignUpService;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    private final SignUpService signUpService;

    public SignUpController(SignUpService signUpService) {
        this.signUpService = signUpService;
    }

    @PostMapping("/add")
    public ResponseEntity<Integer> addAccount(@RequestBody Account account) {
        try {
            int result = signUpService.addAccount(account.username(), account.password(), account.fullName(), account.role());
            if (result > 0) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
