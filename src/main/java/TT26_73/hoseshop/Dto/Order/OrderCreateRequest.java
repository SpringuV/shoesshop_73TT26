package TT26_73.hoseshop.Dto.Order;

import TT26_73.hoseshop.Dto.OrderItem.OrderItemCreateRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderCreateRequest {
//    String status; // (shipped, pending, delivered, cancelled)
//    double totalPrice;
    String paymentStatus;
    String userId;
    String note;
    List<OrderItemCreateRequest> itemsOrder;
}
