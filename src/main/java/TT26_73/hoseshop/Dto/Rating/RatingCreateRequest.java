package TT26_73.hoseshop.Dto.Rating;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RatingCreateRequest {
    String userId;
    String productId;
    String content;

    @Min(0)
    @Max(5)
    int ratePoint;
}
