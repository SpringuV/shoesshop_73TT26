package TT26_73.hoseshop.Mapper;

import TT26_73.hoseshop.Dto.Category.CategoryCreateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryResponse;
import TT26_73.hoseshop.Dto.Category.CategoryWithProductsResponse;
import TT26_73.hoseshop.Model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring", uses = ProductMapper.class)
public interface CategoryMapper {

    @Mapping(target = "productSet", ignore = true)
    @Mapping(target = "nameCate", source = "name")
    @Mapping(target = "id", ignore = true)
    Category toCategoryFromCreateRequest(CategoryCreateRequest request);

    CategoryResponse toResponse(Category category);

    @Mapping(source = "productSet", target = "productInCategoryResponseSet")
    CategoryWithProductsResponse toCategoryWithProductsResponse(Category category);
}
