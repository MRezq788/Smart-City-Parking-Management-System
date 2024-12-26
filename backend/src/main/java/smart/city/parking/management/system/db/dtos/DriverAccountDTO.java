package smart.city.parking.management.system.db.dtos;

public record DriverAccountDTO(String username, String password, String fullName, String role, String plateNumber, String paymentMethod) {}
