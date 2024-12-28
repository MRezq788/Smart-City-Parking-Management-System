package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import smart.city.parking.management.system.db.dtos.AdminPageDriverDTO;
import smart.city.parking.management.system.db.models.Account;
import smart.city.parking.management.system.db.models.Driver;

import java.util.List;

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

    public Driver findDriverByAccountId(int accountId) {
        String sql = "SELECT * FROM driver WHERE account_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{accountId}, (rs, rowNum) -> {
            Driver driver = new Driver(rs.getInt("id"),rs.getInt("account_id"),
                    rs.getString("plate_number"), rs.getString("payment_method"),
                    rs.getInt("penalty_counter"), rs.getBoolean("is_banned"));
            return driver;
        });
    }

    public Driver findDriverById(int id) {
        String sql = "SELECT * FROM driver WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Driver driver = new Driver(rs.getInt("id"),rs.getInt("account_id"),
                    rs.getString("plate_number"), rs.getString("payment_method"),
                    rs.getInt("penalty_counter"), rs.getBoolean("is_banned"));
            return driver;
        });
    }



    public List<AdminPageDriverDTO> findAllDriversWithPages(int page, int size) {
        String sql = "CALL get_all_drivers_paginated(?, ?)";
        return jdbcTemplate.query(sql, new AdminDriverRowMapper(), page, size);
    }

    public List<AdminPageDriverDTO> searchDrivers(String searchTerm, int page, int size) {
        String sql = "CALL search_drivers_paginated(?, ?, ?)";
        return jdbcTemplate.query(sql, new AdminDriverRowMapper(), searchTerm, page,  size);
    }

    public void banDriver(int driverId) {
        String sql = "CALL ban_driver(?)";
        jdbcTemplate.update(sql, driverId);
    }

    public void unbanDriver(int driverId) {
        String sql = "CALL unban_driver(?)";
        jdbcTemplate.update(sql, driverId);
    }

}
