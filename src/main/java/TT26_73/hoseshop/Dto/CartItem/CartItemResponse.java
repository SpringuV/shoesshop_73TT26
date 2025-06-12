package TT26_73.hoseshop.Dto.CartItem;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CartItemResponse {

    ProductCartItemResponse productCartItemResponse;
    UserCartItemResponse userCartItemResponse;
    int quantity;
    Instant createAt;
}
