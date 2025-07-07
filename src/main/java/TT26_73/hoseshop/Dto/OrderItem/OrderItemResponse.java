package TT26_73.hoseshop.Dto.OrderItem;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderItemResponse {
    OrderItemProductResponse itemProductResponse;
    int quantity;
    double price;
    String unit;
    double discount;
}
