package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Configuration.PredefinedRole;
import TT26_73.hoseshop.Dto.User.UserCreateRequest;
import TT26_73.hoseshop.Dto.User.UserCreateResponse;
import TT26_73.hoseshop.Dto.User.UserResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.UserMapper;
import TT26_73.hoseshop.Model.Role;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class UserService {
    AuthenticationService authenticationService;
    UserMapper userMapper;
    UserRepository userRepository;

    public UserCreateResponse createUser(UserCreateRequest userCreateRequest){
        // checkUser existed
        if(userRepository.existsByUsername(userCreateRequest.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // map to user
        User user = userMapper.toUserFromUserCreateRequest(userCreateRequest);
        user.setRole(Role.builder().roleName(PredefinedRole.USER_ROLE).build());
        user.setCreate_at(Instant.now());
        user.setPassword(new BCryptPasswordEncoder().encode(userCreateRequest.getPassword()));

        // save
        userRepository.save(user);
        return userMapper.toCreateResponse(user);
    }

    // Người dùng được phép cập nhật nếu họ là chủ sở hữu của User hoặc admin
    @PreAuthorize("@authenticationService.isOwnerOrAdmin(#id)")
    public void deleteById(String id){
        try{
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException ex){
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
    }

    public UserResponse getInfoUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userMapper.toUserResponse(userRepository.findByUsername(username).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND)));
    }
}
