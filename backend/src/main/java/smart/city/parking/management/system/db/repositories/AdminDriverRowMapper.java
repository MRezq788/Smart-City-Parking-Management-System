package smart.city.parking.management.system.db.repositories;

import org.springframework.jdbc.core.RowMapper;
import smart.city.parking.management.system.db.dtos.AdminPageDriverDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminDriverRowMapper implements RowMapper<AdminPageDriverDTO> {
    @Override
    public AdminPageDriverDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new AdminPageDriverDTO(
                rs.getInt("id"),
                rs.getString("username"),
                rs.getString("full_name"),
                rs.getString("plate_number"),
                rs.getInt("penalty_counter")
        );
    }
}
