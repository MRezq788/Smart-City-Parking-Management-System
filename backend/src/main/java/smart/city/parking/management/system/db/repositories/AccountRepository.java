package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import smart.city.parking.management.system.db.models.Account;

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
        String sql = "SELECT account_id FROM Account WHERE username = ?";
        return jdbcTemplate.query(sql, new AccountRowMapper(), username).get(0).accountId();
    }
}
