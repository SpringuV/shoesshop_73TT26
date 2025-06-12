package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Permission.PermissionCreateRequest;
import TT26_73.hoseshop.Dto.Permission.PermissionResponse;
import TT26_73.hoseshop.Model.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PermissionMapper {

    @Mapping(target = "roleSet", ignore = true)
    Permission toPermission(PermissionCreateRequest request);

    PermissionResponse toResponse(Permission permission);
}
