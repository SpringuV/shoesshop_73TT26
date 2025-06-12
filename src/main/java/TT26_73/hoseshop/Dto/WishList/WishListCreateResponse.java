package TT26_73.hoseshop.Dto.WishList;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class WishListCreateResponse {
    ProductWishListResponse productWishListResponse;
    UserWishListResponse userWishListResponse;
    Instant createAt;
    boolean isLiked;
}
