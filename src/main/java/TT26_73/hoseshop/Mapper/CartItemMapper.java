package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.CartItem.CartItemCreateRequest;
import TT26_73.hoseshop.Dto.CartItem.CartItemResponse;
import TT26_73.hoseshop.Dto.CartItem.ProductCartItemResponse;
import TT26_73.hoseshop.Dto.CartItem.UserCartItemResponse;
import TT26_73.hoseshop.Model.CartItem;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(target = "keyCartItem", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "create_at", ignore = true)
    CartItem toCartItem(CartItemCreateRequest request, User user, Product product);


    @Mapping(source = "user", target = "userCartItemResponse")
    @Mapping(source = "product", target = "productCartItemResponse")
    @Mapping(source = "create_at", target = "createAt")
    @Mapping(source = "quantity", target = "quantity")
    CartItemResponse toResponse(CartItem cartItem);

//     map User -> UserCartItemResponse
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "userName")
    @Mapping(source = "email", target = "email")
    UserCartItemResponse toUserCartItemResponse(User user);

    // Map Product → ProductRatingResponse
    @Mapping(source = "proId", target = "proId")
    @Mapping(source = "nameProduct", target = "nameProduct")
    @Mapping(source = "description", target = "description")
    ProductCartItemResponse toProductCartItemResponse(Product product);

}
