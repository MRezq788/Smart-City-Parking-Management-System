package smart.city.parking.management.system.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import smart.city.parking.management.system.db.entity.parking_lot;
import smart.city.parking.management.system.db.entity.parking_spot;
import smart.city.parking.management.system.db.entity.reservation;
import smart.city.parking.management.system.db.enums.SpotStatus;
import smart.city.parking.management.system.db.enums.SpotType;
import smart.city.parking.management.system.db.repository.LotRepo;
import smart.city.parking.management.system.db.repository.ReservationRepo;
import smart.city.parking.management.system.db.repository.SpotRepo;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class DbApplication implements CommandLineRunner {

	@Autowired
	private LotRepo lotRepo;

	@Autowired
	private SpotRepo spotRepo;

	@Autowired
	private ReservationRepo reservationRepo;

	public static void main(String[] args) {
		SpringApplication.run(DbApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		// Add a new lot
//		parking_lot parkinglot = new parking_lot();
//		parkinglot.setManager_id(1);
//		parkinglot.setLongitude(new BigDecimal("30.123456"));
//		parkinglot.setLatitude(new BigDecimal("31.123456"));
//		parkinglot.setCapacity(100);
//		parkinglot.setOriginal_price(new BigDecimal("10.50"));
//		parkinglot.setDynamic_weight(new BigDecimal("1.5"));
//		parkinglot.setDisabled_discount(new BigDecimal("0.2"));
//		parkinglot.setEv_fees(new BigDecimal("5.0"));
//
//		lotRepo.addLot(parkinglot);
//		System.out.println("Lot added successfully!");
//
//		// Find all lots
//		List<parking_lot> parkinglots = lotRepo.findAllLots();
//		System.out.println("All lots: " + parkinglots);
//
//		// Find lots by manager ID
//		List<parking_lot> lotsByManager = lotRepo.findByManagerId(1);
//		System.out.println("Lots by manager ID 1: " + lotsByManager);

//		// Add a new spot
//		parking_spot parkingSpot = new parking_spot();
//		parkingSpot.setLot_id(1);
//		parkingSpot.setType(SpotType.valueOf("regular"));
//		parkingSpot.setStatus(SpotStatus.valueOf("available"));
//
//		spotRepo.addSpot(parkingSpot);
//		System.out.println("Spot added successfully!");
//
//		// Find all spots by lot ID
//		List<parking_spot> spotsByLot = spotRepo.findAllSpotsByLotId(1);
//		System.out.println("Spots by lot ID 1: " + spotsByLot);

		// Add a new reservation
		reservation reservation = new reservation();
		reservation.setSpot_id(1);
		reservation.setDriver_id(1);
		reservation.setStart_hour(10);
		reservation.setDuration(2);
		reservation.setDate(java.sql.Date.valueOf("2021-05-01"));
		reservation.set_arrived(false);

		reservationRepo.addReservation(reservation);

		// Find all reservations by driver ID
		List<reservation> reservationsByDriver = reservationRepo.findAllReservationsByDriverId(1);
		System.out.println("Reservations by driver ID 1: " + reservationsByDriver);

		// Find all reservations by spot ID
		List<reservation> reservationsBySpot = reservationRepo.findAllReservationsBySpotId(1);
		System.out.println("Reservations by spot ID 1: " + reservationsBySpot);


	}
}
