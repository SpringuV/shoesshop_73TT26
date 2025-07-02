package TT26_73.hoseshop.Dto.CartItem;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductCartItemResponse {
    String proId;
    String nameProduct;
    List<String> sizeResponseSet;
    String brand;
    int prices;
    String imagePath;
}
