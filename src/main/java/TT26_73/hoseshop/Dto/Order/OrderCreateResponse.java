package TT26_73.hoseshop.Dto.Order;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderCreateResponse {
    Instant orderDate;
    String status; // (shipped, pending, delivered, cancelled)
    double totalPrice;
    String paymentStatus;
    UserOrderResponse userOrderResponse;
}
