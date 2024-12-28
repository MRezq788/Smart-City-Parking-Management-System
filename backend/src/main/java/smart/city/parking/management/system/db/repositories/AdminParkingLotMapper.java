package smart.city.parking.management.system.db.repositories;

import org.springframework.jdbc.core.RowMapper;
import smart.city.parking.management.system.db.dtos.AdminParkingLotDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminParkingLotMapper implements RowMapper<AdminParkingLotDTO> {
    @Override
    public AdminParkingLotDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new AdminParkingLotDTO(
                rs.getInt("lot_id"),
                rs.getString("name"),
                rs.getString("lot_manager_username")
        );
    }
}
