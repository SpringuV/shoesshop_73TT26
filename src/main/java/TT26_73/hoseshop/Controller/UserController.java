package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.User.*;
import TT26_73.hoseshop.Service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping
    ApiResponse<UserCreateResponse> createUser(@Valid @RequestBody UserCreateRequest userCreateRequest){
        return ApiResponse.<UserCreateResponse>builder()
                .message("Create user")
                .result(userService.createUser(userCreateRequest))
                .build();
    }

    @PostMapping("/staff")
    ApiResponse<UserResponse> createStaff(@ModelAttribute UserCreateStaffRequest request){
        return ApiResponse.<UserResponse>builder()
                .message("Create Staff")
                .result(userService.createStaff(request))
                .build();
    }

    @GetMapping("/list-user")
    ApiResponse<List<UserResponse>> getListUser(){
        return ApiResponse.<List<UserResponse>>builder()
                .message("Get List User")
                .result(userService.getListUser())
                .build();
    }

    @GetMapping("/list-user/{address}")
    ApiResponse<List<UserResponse>> getListUserByAddress(@PathVariable("address") String address){
        return ApiResponse.<List<UserResponse>>builder()
                .message("Get List User")
                .result(userService.getListUserByAddress(address))
                .build();
    }

    @PutMapping("/{idUser}")
    ApiResponse<UserResponse> updateUser(@PathVariable("idUser") String userId, @ModelAttribute UserUpdateRequest request){
        return  ApiResponse.<UserResponse>builder()
                .message("Update User")
                .result(userService.updateUser(userId, request))
                .build();
    }

    @GetMapping("/staff/all")
    ApiResponse<List<UserResponse>> getListStaff(){
        return ApiResponse.<List<UserResponse>>builder()
                .message("Get List Staff")
                .result(userService.getListUserByRoleStaff())
                .build();
    }

    @GetMapping
    ApiResponse<UserResponse> getInfoUser(){
        return ApiResponse.<UserResponse>builder()
                .result(userService.getInfoUser())
                .build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable String id){
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
