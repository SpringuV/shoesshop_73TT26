package TT26_73.hoseshop.Dto.Category;

import TT26_73.hoseshop.Dto.Product.ProductResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CategoryWithProductsResponse {
    String id;
    String nameCate;
    Set<ProductResponse> productInCategoryResponseSet;
}
