package TT26_73.hoseshop.Dto.Product;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

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
    int size;
    String brand;
    String gender;
    String status;
    Instant create_at;
    Instant update_at;
}
