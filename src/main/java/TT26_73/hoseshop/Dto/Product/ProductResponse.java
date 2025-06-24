package TT26_73.hoseshop.Dto.Product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductResponse {
    String productId;
    String nameProduct;
    String description;
    double prices;
    int stock_quantity;
    List<String> sizeResponseSet;
    String brand;
    String gender;
    String imagePath;
    Instant createAt;
    Instant updateAt;
}
