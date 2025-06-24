package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Product.*;
import TT26_73.hoseshop.Model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "size", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "orderItemSet", ignore = true)
    @Mapping(target = "categorySet", ignore = true)
    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "proId", source = "productId")
    Product toProductFromCreateRequest(ProductCreateRequest productCreateRequest);

    @Mapping(source = "proId", target = "productId")
    @Mapping(source = "size", target = "sizeResponseSet", qualifiedByName = "stringToList")
    ProductCreateResponse toCreateResponse(Product product);

    @Mapping(target = "createAt", ignore = true)
    @Mapping(target = "updateAt", ignore = true)
    @Mapping(target = "size", ignore = true)
    @Mapping(target = "cartItemSet", ignore = true)
    @Mapping(target = "ratingSet", ignore = true)
    @Mapping(target = "imagePath", ignore = true)
    @Mapping(target = "wishlistSet", ignore = true)
    @Mapping(target = "orderItemSet", ignore = true)
    @Mapping(target = "categorySet", ignore = true)
    @Mapping(target = "proId", source = "productId")
    void updateProduct(@MappingTarget Product product, ProductUpdateRequest request);

    @Mapping(source = "proId", target = "productId")
    @Mapping(source = "size", target = "sizeResponseSet", qualifiedByName = "stringToList")
    ProductResponse toProductResponse(Product product);

    @Mapping(source = "proId", target = "productId")
    @Mapping(source = "size", target = "sizeResponseSet", qualifiedByName = "stringToList")
    ProductShowInfo toProductShowInfo(Product product);

    @Named("stringToList")
    default List<String> stringToList(String size){
        if(size == null || size.isEmpty()){
            return new ArrayList<>();
        }
        return List.of(size.split(" "));
    }
}
