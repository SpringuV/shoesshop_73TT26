package TT26_73.hoseshop.Dto.OrderItem;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderItemCreateResponse {
    OrderItemOrderResponse itemOrderResponse;
    OrderItemProductResponse itemProductResponse;
    int quantity;
    double price;
    String unit;
    String note;
    double discount;
    Instant createAt;
}
