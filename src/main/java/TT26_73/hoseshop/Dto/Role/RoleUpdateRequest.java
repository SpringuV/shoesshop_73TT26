package TT26_73.hoseshop.Dto.Role;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoleUpdateRequest {
    String roleName;
    String description;
    List<String> perStringList;
}
