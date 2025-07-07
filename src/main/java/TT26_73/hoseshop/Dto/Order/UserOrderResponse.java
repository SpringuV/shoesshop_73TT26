package TT26_73.hoseshop.Dto.Order;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserOrderResponse {
    String userName;
    String id;
    String email;
    String address;
}
