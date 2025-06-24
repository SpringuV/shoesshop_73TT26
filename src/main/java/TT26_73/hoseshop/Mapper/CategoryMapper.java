package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Category.CategoryCreateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryWithProductsResponse;
import TT26_73.hoseshop.Model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface CategoryMapper {

    @Mapping(target = "productSet", ignore = true)
    @Mapping(target = "id", ignore = true)
    Category toCategoryFromCreateRequest(CategoryCreateRequest request);

    @Mapping(source = "productSet", target = "productInCategoryResponseSet")
    CategoryWithProductsResponse toCategoryWithProductsResponse(Category category);
}
