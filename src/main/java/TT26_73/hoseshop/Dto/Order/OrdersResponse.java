package TT26_73.hoseshop.Dto.Order;

import TT26_73.hoseshop.Dto.OrderItem.OrderItemResponse;
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
public class OrdersResponse {
    String idOrder;
    Instant orderDate;
    String status; // (shipped, pending, delivered, cancelled)
    double totalPrice;
    String paymentStatus;
    String paymentMethod;
    String note;
    UserOrderResponse userOrderResponse;
    List<OrderItemResponse> orderItemResponseList;
}
