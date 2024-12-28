package smart.city.parking.management.system.db.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import smart.city.parking.management.system.db.models.reservation;

import java.util.List;

@Repository
public class ReservationRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void addReservation(reservation reservation) {
        jdbcTemplate.update("INSERT INTO reservation (spot_id, driver_id, start_hour, duration, date, is_arrived, is_notified) VALUES (?,?,?,?,?,?,?)",
                reservation.getSpot_id(), reservation.getDriver_id(), reservation.getStart_hour(),
                reservation.getDuration(), reservation.getDate(), reservation.is_arrived(), reservation.is_notified());
    }
    public void deleteReservationById(int reservationId) {
        String sql = "DELETE FROM reservation WHERE reservation_id = ?";
        jdbcTemplate.update(sql, reservationId);
    }
    public reservation findReservationById(int reservationId) {
        String sql = "SELECT * FROM reservation WHERE reservation_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{reservationId}, (rs, rowNum) -> {
            reservation res = new reservation();
            res.setReservation_id(rs.getInt("reservation_id"));
            res.setSpot_id(rs.getInt("spot_id"));
            res.setDriver_id(rs.getInt("driver_id"));
            res.setStart_hour(rs.getInt("start_hour"));
            res.setDuration(rs.getInt("duration"));
            res.setDate(rs.getDate("date"));
            res.set_arrived(rs.getBoolean("is_arrived"));
            res.set_notified(rs.getBoolean("is_notified"));
            return res;
        });
    }

    public List<reservation> findAllReservationsByDriverId(int driverId) {
        String sql = "SELECT * FROM reservation WHERE driver_id = ?";
        return jdbcTemplate.query(sql, new Object[]{driverId}, (rs, rowNum) -> {
            reservation res = new reservation();
            res.setReservation_id(rs.getInt("reservation_id"));
            res.setSpot_id(rs.getInt("spot_id"));
            res.setDriver_id(rs.getInt("driver_id"));
            res.setStart_hour(rs.getInt("start_hour"));
            res.setDuration(rs.getInt("duration"));
            res.setDate(rs.getDate("date"));
            res.set_arrived(rs.getBoolean("is_arrived"));
            return res;
        });
    }

    public List<reservation> findAllReservationsBySpotId(int spotId) {
        String sql = "SELECT * FROM reservation WHERE spot_id = ?";
        return jdbcTemplate.query(sql, new Object[]{spotId}, (rs, rowNum) -> {
            reservation reservation = new reservation();
            reservation.setReservation_id(rs.getInt("reservation_id"));
            reservation.setSpot_id(rs.getInt("spot_id"));
            reservation.setDriver_id(rs.getInt("driver_id"));
            reservation.setStart_hour(rs.getInt("start_hour"));
            reservation.setDuration(rs.getInt("duration"));
            reservation.setDate(rs.getDate("date"));
            reservation.set_arrived(rs.getBoolean("is_arrived"));
            reservation.set_notified(rs.getBoolean("is_notified"));
            return reservation;
        });
    }
}
