package smart.city.parking.management.system.db.models;

public record Driver(
        int id,
        int accountId,
        String plateNumber,
        String paymentMethod,
        int penaltyCounter,
        boolean isBanned
) {}
