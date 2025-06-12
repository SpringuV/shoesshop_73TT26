package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Role.RoleCreateRequest;
import TT26_73.hoseshop.Dto.Role.RoleCreateResponse;
import TT26_73.hoseshop.Dto.Role.RoleResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.RoleMapper;
import TT26_73.hoseshop.Model.Role;
import TT26_73.hoseshop.Repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public RoleCreateResponse createRole(RoleCreateRequest request){
        if(roleRepository.existsById(request.getRoleName())){
            throw  new AppException(ErrorCode.ROLE_EXISTED);
        }
        Role role = roleMapper.toRoleFromCreate(request);
        // save
        roleRepository.save(role);
        return roleMapper.toCreateResponse(role);
    }

    public List<RoleResponse> getListRole(){
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).collect(Collectors.toList());
    }

    public RoleResponse getRoleByName(String roleName){
        return roleMapper.toRoleResponse(roleRepository.findById(roleName).orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_FOUND)));
    }

    public void deleteRoleById(String roleName){
        roleRepository.deleteById(roleName);
    }
}
