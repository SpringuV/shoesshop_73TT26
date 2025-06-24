package TT26_73.hoseshop.Dto.Category;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class CategoryUpdateRequest {
    String nameCate;
    List<String> productIds;
}
