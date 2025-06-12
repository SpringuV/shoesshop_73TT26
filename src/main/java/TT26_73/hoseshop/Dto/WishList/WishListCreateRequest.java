package TT26_73.hoseshop.Dto.WishList;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class WishListCreateRequest {
    String userId;
    String productId;
    boolean isLiked;
}
