package smart.city.parking.management.system.db.repositories;

import org.springframework.jdbc.core.RowMapper;
import smart.city.parking.management.system.db.dtos.ReportDriverDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReportDriverMapper implements RowMapper<ReportDriverDTO> {
    @Override
    public ReportDriverDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new ReportDriverDTO(
                rs.getString("username"),
                rs.getString("full_name"),
                rs.getString("plate_number")
        );
    }
}
