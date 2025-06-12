package TT26_73.hoseshop.Dto.Permission;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PermissionCreateRequest {
    String permissionName;
    String description;
}
