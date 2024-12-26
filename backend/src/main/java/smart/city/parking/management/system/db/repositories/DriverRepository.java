package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DriverRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int addDriver(int accountId, String plateNumber, String paymentMethod, int penalityCounter, boolean isBanned) {
        String sql = "INSERT INTO driver (account_id, plate_number, payment_method, penalty_counter, is_banned) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, accountId, plateNumber, paymentMethod, penalityCounter, isBanned);
    }
}
