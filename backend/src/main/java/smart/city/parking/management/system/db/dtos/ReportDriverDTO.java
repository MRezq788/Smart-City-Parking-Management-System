package smart.city.parking.management.system.db.dtos;

public class ReportDriverDTO {
    private String username;
    private String fullName;
    private String plateNumber;

    public ReportDriverDTO(){};

    public ReportDriverDTO(String username, String fullName, String plateNumber) {
        this.username = username;
        this.fullName = fullName;
        this.plateNumber = plateNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }
}
