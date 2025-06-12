package TT26_73.hoseshop.Dto.Rating;

import TT26_73.hoseshop.Dto.Product.ProductResponse;
import TT26_73.hoseshop.Dto.User.UserResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RatingResponse {

    UserRatingResponse userRating;
    ProductRatingResponse productRating;
    String content;
    int ratePoint;
    Instant createAt;
}
