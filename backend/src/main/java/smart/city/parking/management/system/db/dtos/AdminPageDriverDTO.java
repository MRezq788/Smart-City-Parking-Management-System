package smart.city.parking.management.system.db.dtos;

public record AdminPageDriverDTO(int id, String username, String fullName, String plateNumber, int penaltyCounter, boolean isBanned) {}

