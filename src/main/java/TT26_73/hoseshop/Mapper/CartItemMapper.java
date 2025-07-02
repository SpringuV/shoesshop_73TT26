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
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(target = "keyCartItem", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "size", source = "request.size")
    @Mapping(target = "createAt", ignore = true)
    CartItem toCartItem(CartItemCreateRequest request, User user, Product product);


    @Mapping(source = "user", target = "userCartItemResponse")
    @Mapping(source = "product", target = "productCartItemResponse")
    @Mapping(source = "createAt", target = "createAt")
    @Mapping(source = "quantity", target = "quantity")
    @Mapping(target = "size", source = "size")
    CartItemResponse toResponse(CartItem cartItem);

//     map User -> UserCartItemResponse
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "userName")
    @Mapping(source = "email", target = "email")
    UserCartItemResponse toUserCartItemResponse(User user);

    // Map Product → ProductRatingResponse
    @Mapping(source = "proId", target = "proId")
    @Mapping(source = "nameProduct", target = "nameProduct")
    @Mapping(source = "prices", target = "prices")
    @Mapping(source = "brand", target = "brand")
    @Mapping(target = "sizeResponseSet", source = "size", qualifiedByName = "stringToList")
    @Mapping(source = "imagePath", target = "imagePath")
    ProductCartItemResponse toProductCartItemResponse(Product product);

    @Named("stringToList")
    default List<String> stringToList(String size){
        if(size == null || size.isEmpty()){
            return new ArrayList<>();
        }
        return List.of(size.split(" "));
    }
}
