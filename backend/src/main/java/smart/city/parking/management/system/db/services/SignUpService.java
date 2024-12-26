package smart.city.parking.management.system.db.services;

import org.springframework.stereotype.Service;
import smart.city.parking.management.system.db.repositories.AccountRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class SignUpService {
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public SignUpService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public int addAccount(String username, String password, String fullName, String role) {
        String encodedPassword = passwordEncoder.encode(password);
        return accountRepository.addAccount(username, encodedPassword, fullName, role);
    }
}
