package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Rating.ProductRatingResponse;
import TT26_73.hoseshop.Dto.Rating.RatingCreateRequest;
import TT26_73.hoseshop.Dto.Rating.RatingResponse;
import TT26_73.hoseshop.Dto.Rating.UserRatingResponse;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.Rating;
import TT26_73.hoseshop.Model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RatingMapper {

//    @Mapping(target = "keyRating", expression = "java(new KeyRating(request.getUserId(), request.getProductId))")
    @Mapping(target = "keyRating", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "product", source = "product")
    @Mapping(target = "create_at", ignore = true)
    @Mapping(target = "update_at", ignore = true)
    Rating toRating(RatingCreateRequest request, User user, Product product);


    @Mapping(source = "user", target = "userRating")
    @Mapping(source = "product", target = "productRating")
    @Mapping(source = "create_at", target = "createAt")
    RatingResponse toResponse(Rating rating);

    // map User -> UserRatingResponse
    @Mapping(source = "userId", target = "id")
    @Mapping(source = "username", target = "userName")
    @Mapping(source = "email", target = "email")
    UserRatingResponse toUserRatingResponse(User user);

    // Map Product → ProductRatingResponse
    @Mapping(source = "proId", target = "proId")
    @Mapping(source = "nameProduct", target = "nameProduct")
    @Mapping(source = "description", target = "description")
    ProductRatingResponse toProductRatingResponse(Product product);
}
