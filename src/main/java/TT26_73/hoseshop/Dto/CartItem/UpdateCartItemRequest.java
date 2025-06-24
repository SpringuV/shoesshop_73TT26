package TT26_73.hoseshop.Dto.CartItem;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UpdateCartItemRequest {
    String userId;
    String productId;
    int quantity;
}
