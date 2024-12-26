package smart.city.parking.management.system.db.models;

public record Account(
    int accountId,
    String username,
    String fullName,
    String role
) {}
