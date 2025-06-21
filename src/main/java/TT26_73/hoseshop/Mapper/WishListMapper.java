package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.WishList.ProductWishListResponse;
import TT26_73.hoseshop.Dto.WishList.UserWishListResponse;
import TT26_73.hoseshop.Dto.WishList.WishListCreateRequest;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Model.Wishlist;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WishListMapper {

    @Mapping(target = "keyWishList", ignore = true)
    @Mapping(target = "createAt", ignore = true)
    Wishlist toEntityFromCreateRequest(WishListCreateRequest request, User user, Product product);

    @Mapping(source = "userId",target = "userId")
    @Mapping(source = "username",target = "username")
    @Mapping(source = "fullname",target = "fullname")
    UserWishListResponse toUserWishListResponse(User user);


    ProductWishListResponse toProductWishListResponse(Product product);
}
