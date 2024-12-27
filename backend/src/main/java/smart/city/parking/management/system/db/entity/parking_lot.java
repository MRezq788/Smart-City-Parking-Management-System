package smart.city.parking.management.system.db.entity;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@Scope("prototype")
@Data
public class parking_lot {
    private int lot_id;
    private int manager_id;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private int capacity;
    private BigDecimal original_price;
    private BigDecimal dynamic_weight;
    private BigDecimal disabled_discount;
    private BigDecimal ev_fees;
}
