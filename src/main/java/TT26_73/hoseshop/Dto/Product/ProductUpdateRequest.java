package TT26_73.hoseshop.Dto.Product;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ProductUpdateRequest {
    String productId;
    String nameProduct;
    String description;
    double prices;
    List<String> size;
    String brand;
    int stock_quantity;
    String gender;
    MultipartFile image;
}
