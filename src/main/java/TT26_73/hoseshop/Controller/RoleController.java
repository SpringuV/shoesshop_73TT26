package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Role.RoleCreateRequest;
import TT26_73.hoseshop.Dto.Role.RoleCreateResponse;
import TT26_73.hoseshop.Dto.Role.RoleResponse;
import TT26_73.hoseshop.Dto.Role.RoleUpdateRequest;
import TT26_73.hoseshop.Service.RoleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleController {
    RoleService roleService;

    @PutMapping
    ApiResponse<RoleResponse> updateRole(@RequestBody RoleUpdateRequest request){
        return ApiResponse.<RoleResponse>builder()
                .message("Update Role")
                .result(roleService.updateRole(request))
                .build();
    }

    @PostMapping
    ApiResponse<RoleCreateResponse> createRole(@Valid @RequestBody RoleCreateRequest roleCreateRequest){
        return ApiResponse.<RoleCreateResponse>builder()
                .message("Create Role")
                .result(roleService.createRole(roleCreateRequest))
                .build();
    }

    @GetMapping("/{roleName}")
    ApiResponse<RoleResponse> getRoleById(String roleName){
        return ApiResponse.<RoleResponse>builder()
                .message("Get Role")
                .result(roleService.getRoleByName(roleName))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoleResponse>> getListRole(){
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getListRole())
                .build();
    }

    @DeleteMapping("/{roleName}")
    ResponseEntity<Void> deleteRoleById(@PathVariable("roleName") String roleName){
        roleService.deleteRoleById(roleName);
        return ResponseEntity.noContent().build();
    }
}
