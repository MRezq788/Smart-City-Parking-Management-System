package smart.city.parking.management.system.db.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import smart.city.parking.management.system.db.entity.parking_lot;

import java.util.List;

@Repository
public class LotRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addLot(parking_lot parkinglot) {
        jdbcTemplate.update("INSERT INTO parking_lot (manager_id, longitude, latitude, capacity, original_price," +
                        " dynamic_weight, disabled_discount, ev_fees) VALUES (?,?,?,?,?,?,?,?)",
                parkinglot.getManager_id(), parkinglot.getLongitude(), parkinglot.getLatitude(), parkinglot.getCapacity(), parkinglot.getOriginal_price(),
                parkinglot.getDynamic_weight(), parkinglot.getDisabled_discount(), parkinglot.getEv_fees());
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
            return parkinglot;
        });
    }
}
