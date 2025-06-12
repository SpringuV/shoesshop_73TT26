package TT26_73.hoseshop.Dto.Rating;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductRatingResponse {
    String proId;
    String nameProduct;
    String description;
}
