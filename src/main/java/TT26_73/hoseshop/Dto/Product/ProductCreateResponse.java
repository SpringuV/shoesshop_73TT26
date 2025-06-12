package TT26_73.hoseshop.Dto.Product;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductCreateResponse {
    String productId;
    String nameProduct;
    String description;
    double prices;
    int size;
    String brand;
    int stock_quantity;
    String gender;
    String status;
}
