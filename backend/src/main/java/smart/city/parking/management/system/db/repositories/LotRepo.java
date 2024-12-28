package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import smart.city.parking.management.system.db.models.parking_lot;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class LotRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int addLot(parking_lot parkingLot) {
        String sql = "INSERT INTO parking_lot (manager_id, longitude, latitude, capacity, original_price, " +
                "dynamic_weight, disabled_discount, ev_fees, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, parkingLot.getManager_id());
            ps.setBigDecimal(2, parkingLot.getLongitude());
            ps.setBigDecimal(3, parkingLot.getLatitude());
            ps.setInt(4, parkingLot.getCapacity());
            ps.setBigDecimal(5, parkingLot.getOriginal_price());
            ps.setBigDecimal(6, parkingLot.getDynamic_weight());
            ps.setBigDecimal(7, parkingLot.getDisabled_discount());
            ps.setBigDecimal(8, parkingLot.getEv_fees());
            ps.setString(9, parkingLot.getName());
            return ps;
        }, keyHolder);

        // Return the generated key (lot_id)
        return keyHolder.getKey().intValue();
    }

    public List<parking_lot> findAllLots() {
        String sql = "SELECT * FROM parking_lot";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            parking_lot parkinglot = new parking_lot();
            parkinglot.setLot_id(rs.getInt("lot_id"));
            parkinglot.setManager_id(rs.getInt("manager_id"));
            parkinglot.setLongitude(rs.getBigDecimal("longitude"));
            parkinglot.setLatitude(rs.getBigDecimal("latitude"));
            parkinglot.setCapacity(rs.getInt("capacity"));
            parkinglot.setOriginal_price(rs.getBigDecimal("original_price"));
            parkinglot.setDynamic_weight(rs.getBigDecimal("dynamic_weight"));
            parkinglot.setDisabled_discount(rs.getBigDecimal("disabled_discount"));
            parkinglot.setEv_fees(rs.getBigDecimal("ev_fees"));
            parkinglot.setName(rs.getString("name"));
            return parkinglot;
        });
    }

    public List<parking_lot> findByManagerId(int managerId) {
        String sql = "SELECT * FROM parking_lot WHERE manager_id = ?";
        return jdbcTemplate.query(sql, new Object[]{managerId}, (rs, rowNum) -> {
            parking_lot parkinglot = new parking_lot();
            parkinglot.setLot_id(rs.getInt("lot_id"));
            parkinglot.setManager_id(rs.getInt("manager_id"));
            parkinglot.setLongitude(rs.getBigDecimal("longitude"));
            parkinglot.setLatitude(rs.getBigDecimal("latitude"));
            parkinglot.setCapacity(rs.getInt("capacity"));
            parkinglot.setOriginal_price(rs.getBigDecimal("original_price"));
            parkinglot.setDynamic_weight(rs.getBigDecimal("dynamic_weight"));
            parkinglot.setDisabled_discount(rs.getBigDecimal("disabled_discount"));
            parkinglot.setEv_fees(rs.getBigDecimal("ev_fees"));
            parkinglot.setName(rs.getString("name"));
            return parkinglot;
        });
    }
}
