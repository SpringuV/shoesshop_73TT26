package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Permission.PermissionCreateRequest;
import TT26_73.hoseshop.Dto.Permission.PermissionResponse;
import TT26_73.hoseshop.Service.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionResponse> createPermission(@RequestBody PermissionCreateRequest request){
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.createPermisson(request))
                .build();
    }

    @GetMapping("/{name}")
    ApiResponse<PermissionResponse> getPermissionById(@PathVariable("name") String permissionName){
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.getById(permissionName))
                .build();
    }

    @GetMapping
    ApiResponse<List<PermissionResponse>> getListPermission(){
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getListPermission())
                .build();
    }

    @DeleteMapping("/{name}")
    ResponseEntity<Void> deletePermission(@PathVariable("name") String permissionName){
        permissionService.deleteByID(permissionName);
        return ResponseEntity.noContent().build();
    }
}
