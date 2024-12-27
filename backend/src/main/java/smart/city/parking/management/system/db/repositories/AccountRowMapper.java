package smart.city.parking.management.system.db.repositories;

import org.springframework.jdbc.core.RowMapper;

import smart.city.parking.management.system.db.models.Account;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountRowMapper implements RowMapper<Account> {
    @Override
    public Account mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Account(
            rs.getInt("account_id"), 
            rs.getString("username"), 
            rs.getString("full_name"),
            rs.getString("password"),
            rs.getString("role")
        );
    }
}
