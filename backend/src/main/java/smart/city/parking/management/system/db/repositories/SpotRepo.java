package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import smart.city.parking.management.system.db.models.parking_spot;
import smart.city.parking.management.system.db.enums.SpotType;
import smart.city.parking.management.system.db.enums.SpotStatus;

import java.util.List;

@Repository
public class SpotRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addSpot(parking_spot parkingSpot) {
        jdbcTemplate.update("INSERT INTO parking_spot (lot_id, type, status) VALUES (?,?,?)",
                parkingSpot.getLot_id(), parkingSpot.getType().toString(), parkingSpot.getStatus().toString());
    }

    public List<parking_spot> findAllSpotsByLotId(int lotId) {
        String sql = "SELECT * FROM parking_spot WHERE lot_id = ?";
        return jdbcTemplate.query(sql, new Object[]{lotId}, (rs, rowNum) -> {
            parking_spot parkingSpot = new parking_spot();
            parkingSpot.setSpot_id(rs.getInt("spot_id"));
            parkingSpot.setLot_id(rs.getInt("lot_id"));
            parkingSpot.setType(SpotType.valueOf(rs.getString("type")));
            parkingSpot.setStatus(SpotStatus.valueOf(rs.getString("status")));
            return parkingSpot;
        });
    }
}
