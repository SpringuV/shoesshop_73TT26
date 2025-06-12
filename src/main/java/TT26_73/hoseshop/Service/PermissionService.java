package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Permission.PermissionCreateRequest;
import TT26_73.hoseshop.Dto.Permission.PermissionResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.PermissionMapper;
import TT26_73.hoseshop.Model.Permission;
import TT26_73.hoseshop.Repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public PermissionResponse createPermisson(PermissionCreateRequest permissionCreateRequest){
        if(permissionRepository.existsById(permissionCreateRequest.getPermissionName())){
            throw  new AppException(ErrorCode.PERMISSION_EXISTED);
        }
        Permission permission = permissionMapper.toPermission(permissionCreateRequest);

        permissionRepository.save(permission);
        return permissionMapper.toResponse(permission);
    }

    public PermissionResponse getById(String permissionName){
        return permissionMapper.toResponse(permissionRepository.findById(permissionName).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public List<PermissionResponse> getListPermission(){
        return permissionRepository.findAll().stream().map(permissionMapper::toResponse).toList();
    }

    public void deleteByID(String permissionName){
        permissionRepository.deleteById(permissionName);
    }


}
