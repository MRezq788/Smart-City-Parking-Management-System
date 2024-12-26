package smart.city.parking.management.system.db.controllers;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import smart.city.parking.management.system.db.repositories.AccountRepository;
import smart.city.parking.management.system.db.services.JWTService;

@RestController
public class SignInController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AccountRepository accountRepository;

    public SignInController(JWTService jwtService, AccountRepository accountRepository) {
        this.jwtService = jwtService;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn() {
        // Get the authenticated user from the Security Context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Extract user roles as a list of strings
            String roles = authentication.getAuthorities()
                    .stream()
                    .map(grantedAuthority -> grantedAuthority.getAuthority())
                    .toList()
                    .toString(); // Convert to a string or pass as a list

            // Extract account_id from the database
            int id = accountRepository.findIdByUsername(userDetails.getUsername());

            // Generate the JWT
            String token = jwtService.generateToken(userDetails.getUsername());

            // Wrap the response in a ResponseEntity
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("id", id);
            response.put("role", roles);

            return ResponseEntity.ok(response);
        }

        throw new IllegalStateException("User is not authenticated");
    }
}
