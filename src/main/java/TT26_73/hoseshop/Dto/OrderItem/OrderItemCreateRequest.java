package TT26_73.hoseshop.Dto.OrderItem;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderItemCreateRequest {
    String idOrders;
    String proId;
    int quantity;
    double price;
    String unit;
    String note;
    double discount;
}
