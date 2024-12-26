package smart.city.parking.management.system.db.models;

public record Account(
    int accountId,
    String username,
    String password,
    String fullName,
    String role
) {}
