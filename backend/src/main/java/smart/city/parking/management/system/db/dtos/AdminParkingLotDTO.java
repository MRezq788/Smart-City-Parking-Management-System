package smart.city.parking.management.system.db.dtos;

public record AdminParkingLotDTO(
        int lotId,
        String name,
        String lotManagerUsername
) {}
