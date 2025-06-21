package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.User.*;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "fullname", ignore = true)
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "age", ignore = true)
    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "ordersSet", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    User toUserFromUserCreateRequest(UserCreateRequest userCreateRequest);

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "ordersSet", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    User toUserFromStaffCreateRequest(UserCreateStaffRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "role", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "ordersSet", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    void toUserFromUpdateRequest(@MappingTarget User user, UserUpdateRequest userUpdateRequest);

    UserCreateResponse toCreateResponse(User user);

}
