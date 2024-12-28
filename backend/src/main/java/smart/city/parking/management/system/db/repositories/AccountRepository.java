package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import smart.city.parking.management.system.db.models.Account;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AccountRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public AccountRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Account> findAllAccounts() {
        String sql = "SELECT account_id, username, full_name, role FROM Account";
        return jdbcTemplate.query(sql, new AccountRowMapper());
    }

    public Account findAccountById(int id) {
        String sql = "SELECT account_id, username, full_name, role FROM Account WHERE account_id = ?";
        return jdbcTemplate.queryForObject(sql, new AccountRowMapper(), id);
    }

    public int findIdByUsername(String username) {
        String sql = "SELECT * FROM account WHERE username = ?";
        return jdbcTemplate.query(sql, new AccountRowMapper(), username).get(0).accountId();
    }

    public int addAccount(String username, String password, String fullName, String role) {
        try {
            jdbcTemplate.execute("START TRANSACTION");

            String sql = "INSERT INTO Account (username, password, full_name, role) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, username, password, fullName, role);

            jdbcTemplate.execute("COMMIT");
            return jdbcTemplate.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        } catch (DataAccessException e) {
            jdbcTemplate.execute("ROLLBACK");
            throw new RuntimeException("Failed to add account. Transaction rolled back.", e);
        }
    }
}
