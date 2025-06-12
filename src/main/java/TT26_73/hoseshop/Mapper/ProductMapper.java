package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Product.ProductCreateRequest;
import TT26_73.hoseshop.Dto.Product.ProductCreateResponse;
import TT26_73.hoseshop.Dto.Product.ProductResponse;
import TT26_73.hoseshop.Model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "create_at", ignore = true)
    @Mapping(target = "update_at", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "orderItemSet", ignore = true)
    @Mapping(target = "categorySet", ignore = true)
    @Mapping(target = "proId", source = "productId")
    Product toProductFromCreateRequest(ProductCreateRequest productCreateRequest);

    @Mapping(source = "proId", target = "productId")
    ProductCreateResponse toCreateResponse(Product product);

    @Mapping(source = "proId", target = "productId")
    ProductResponse toProductResponse(Product product);
}
