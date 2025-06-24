package TT26_73.hoseshop.Dto.Category;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CategoryCreateRequest {
    String nameCate;
    String nameProduct;
}
