package smart.city.parking.management.system.db.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class LotDTO {
    private int lot_id;
    private int manager_id;
    private String name;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private int capacity;
    private BigDecimal original_price;
    private BigDecimal dynamic_weight;
    private BigDecimal disabled_discount;
    private BigDecimal ev_fees;
    private List<SpotDTO> spots;

}
