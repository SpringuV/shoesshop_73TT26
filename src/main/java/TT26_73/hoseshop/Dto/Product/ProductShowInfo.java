package TT26_73.hoseshop.Dto.Product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductShowInfo {
    String productId;
    String nameProduct;
    String description;
    double prices;
    List<String> sizeResponseSet;
    String brand;
    String gender;
    String imagePath;
    int stock_quantity;
}
