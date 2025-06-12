package TT26_73.hoseshop.Dto.Role;

import TT26_73.hoseshop.Dto.Permission.PermissionResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class RoleResponse {
    String roleName;
    String description;
    List<PermissionResponse> permissionResponseList;
}
