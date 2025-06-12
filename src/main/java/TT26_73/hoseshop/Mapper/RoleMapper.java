package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Permission.PermissionResponse;
import TT26_73.hoseshop.Dto.Role.RoleCreateRequest;
import TT26_73.hoseshop.Dto.Role.RoleCreateResponse;
import TT26_73.hoseshop.Dto.Role.RoleResponse;
import TT26_73.hoseshop.Model.Permission;
import TT26_73.hoseshop.Model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    @Mapping(target = "userSet", ignore = true)
    @Mapping(target = "permissionSet", ignore = true)
    Role toRoleFromCreate(RoleCreateRequest request);

    RoleCreateResponse toCreateResponse(Role role);

    @Mapping(target = "permissionResponseList", source = "permissionSet", qualifiedByName = "toPermissionSet")
    RoleResponse toRoleResponse(Role role);

    @Named("toPermissionSet")
    default List<PermissionResponse> toPermissionResponseList(Set<Permission> permissions){
        return permissions.stream().map(permission -> PermissionResponse.builder()
                .description(permission.getDescription())
                .permissionName(permission.getPermissionName())
                .build()).toList();
    }
}
