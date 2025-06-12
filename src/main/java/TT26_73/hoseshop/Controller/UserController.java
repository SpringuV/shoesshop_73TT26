package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.User.UserCreateRequest;
import TT26_73.hoseshop.Dto.User.UserCreateResponse;
import TT26_73.hoseshop.Dto.User.UserResponse;
import TT26_73.hoseshop.Service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
