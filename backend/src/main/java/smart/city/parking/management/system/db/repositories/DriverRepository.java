package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import smart.city.parking.management.system.db.models.Account;
import smart.city.parking.management.system.db.models.Driver;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class DriverRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int addDriverAndAccount(Account account, Driver driver) {
        try {
            // Begin the transaction
            jdbcTemplate.execute("START TRANSACTION");

            // Add the account
            String accountSql = "INSERT INTO Account (username, password, full_name, role) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(accountSql, account.username(), account.password(), account.fullName(), account.role());

            // Get the generated account ID
            Integer accountId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);

            // Add the driver
            String driverSql = "INSERT INTO driver (account_id, plate_number, payment_method, penalty_counter, is_banned) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(driverSql, accountId, driver.plateNumber(), driver.paymentMethod(), 0, false);

            Integer driverId = jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
            // Commit the transaction
            jdbcTemplate.execute("COMMIT");
            return driverId;

        } catch (Exception e) {
            // Rollback the transaction in case of error
            jdbcTemplate.execute("ROLLBACK");
            throw new RuntimeException("Failed to add driver and account. Transaction rolled back.", e);
        }
    }
}
