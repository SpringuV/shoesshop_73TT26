package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.User.UserCreateRequest;
import TT26_73.hoseshop.Dto.User.UserCreateResponse;
import TT26_73.hoseshop.Dto.User.UserResponse;
import TT26_73.hoseshop.Dto.User.UserUpdateRequest;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "fullname", ignore = true)
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "age", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "ordersSet", ignore = true)
    @Mapping(target = "create_at", ignore = true)
    @Mapping(target = "update_at", ignore = true)
    User toUserFromUserCreateRequest(UserCreateRequest userCreateRequest);

    UserResponse toUserResponse(User user);



    @Mapping(target = "role", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "ordersSet", ignore = true)
    @Mapping(target = "create_at", ignore = true)
    @Mapping(target = "update_at", ignore = true)
    User toUserFromUpdateRequest(UserUpdateRequest userUpdateRequest);

    UserCreateResponse toCreateResponse(User user);

}
