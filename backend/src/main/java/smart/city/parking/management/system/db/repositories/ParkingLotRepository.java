package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import smart.city.parking.management.system.db.dtos.AdminParkingLotDTO;

import java.util.List;

@Repository
public class ParkingLotRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<AdminParkingLotDTO> findAllParkingLotsWithPages(int page, int size) {
        String sql = "CALL get_all_parking_lots_paginated(?, ?)";
        return jdbcTemplate.query(sql, new AdminParkingLotMapper(), page, size);
    }

    public List<AdminParkingLotDTO> searchParkingLots(String searchTerm, int page, int size) {
        String sql = "CALL search_parking_lots_paginated(?, ?, ?)";
        return jdbcTemplate.query(sql, new AdminParkingLotMapper(), searchTerm, page, size);
    }

    public void deleteParkingLotById(int lotId) {
        String sql = "DELETE FROM parking_lot WHERE lot_id = ?";
        jdbcTemplate.update(sql, lotId);
    }
}
