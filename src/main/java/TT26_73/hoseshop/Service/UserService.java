package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Configuration.PredefinedRole;
import TT26_73.hoseshop.Dto.User.*;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class UserService {
    AuthenticationService authenticationService;
    UserMapper userMapper;
    UserRepository userRepository;

    private void exeProcessImage(MultipartFile imageFile, String fileName){
        if (!imageFile.isEmpty() && imageFile != null) {
            try{
                String uploadDir = "uploads/users/";
                File directory = new File(uploadDir);
                if(!directory.exists()){
                    directory.mkdirs();
                }
                Path pathFile = Paths.get(uploadDir, fileName);
                Files.write(pathFile, imageFile.getBytes());
            } catch (IOException e){
                throw new AppException(ErrorCode.FILE_UPLOAD_ERROR);
            }
        }
    }

    public UserResponse createStaff (UserCreateStaffRequest request){
        // checkUser existed
        if(userRepository.existsByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUserFromStaffCreateRequest(request);
        user.setRole(Role.builder().roleName(PredefinedRole.STAFF).build());
        user.setPassword(new BCryptPasswordEncoder().encode(request.getPassword()));

        // Xử lý ảnh
        MultipartFile imageFile = request.getImage();
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        exeProcessImage(imageFile, fileName);
        user.setImagePath("/uploads/users/" + fileName);

        // save
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public UserResponse updateUser(String idUser, UserUpdateRequest request){
        User user = userRepository.findById(idUser).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        userMapper.toUserFromUpdateRequest(user, request);
        // Xử lý ảnh
        MultipartFile imageFile = request.getImage();
        String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
        exeProcessImage(imageFile, fileName);
        user.setImagePath("/uploads/users/" + fileName);

        // save
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public List<UserResponse> getListUserByAddress(String address){
        return userRepository.findAllByAddress(address).stream().map(userMapper::toUserResponse).toList();
    }

    public List<UserResponse> getListUserByRoleStaff(){
        return userRepository.findAllByRole_RoleName(PredefinedRole.STAFF).stream().map(userMapper::toUserResponse).toList();
    }

    public List<UserResponse> getListUser(){
        return  userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    public UserCreateResponse createUser(UserCreateRequest userCreateRequest){
        // checkUser existed
        if(userRepository.existsByUsername(userCreateRequest.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // map to user
        User user = userMapper.toUserFromUserCreateRequest(userCreateRequest);
        user.setRole(Role.builder().roleName(PredefinedRole.USER_ROLE).build());
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
