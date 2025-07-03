package TT26_73.hoseshop.Dto.WishList;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductWishListResponse {
    String proId;
    String nameProduct;
    double prices;
    String gender;
    String brand;
    String imagePath;
}
