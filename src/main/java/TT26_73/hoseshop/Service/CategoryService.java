package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Category.CategoryCreateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryResponse;
import TT26_73.hoseshop.Dto.Category.CategoryWithProductsResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.CategoryMapper;
import TT26_73.hoseshop.Model.Category;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Repository.CategoryRepository;
import TT26_73.hoseshop.Repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class CategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;
    ProductRepository productRepository;

    public CategoryResponse createCategory(CategoryCreateRequest request){
        // start check cate existed
        if(categoryRepository.findByNameCate(request.getName()).isPresent()){
            throw new AppException(ErrorCode.CATEGORY_EXISTED);
        }
        // end check cate existed
        Category category = categoryMapper.toCategoryFromCreateRequest(request);
//        List<Product> productList = productRepository.f

        categoryRepository.save(category);
        return categoryMapper.toResponse(category);
    }

    public CategoryWithProductsResponse addProductIntoCate(String cateId, Set<String> productIds){
        // vì mapped by category nên bên product mới là chủ sở hữu (owning side), nghĩa là product là bên chủ động lưu trữ dữ liệu,
        // category là bên bị ánh xạ (inverse side) sẽ không chịu trách nhiệm cập nhật bảng trung gian
        Category category = categoryRepository.findById(cateId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        List<Product> productList = productRepository.findAllById(productIds);
        if(productList.size() != productIds.size()){
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        for(Product product : productList){
            // check bị trùng category đã tồn tại trong product
            if(!product.getCategorySet().contains(category)){
                product.getCategorySet().add(category); // cap nhat ben owing side
            }
        }
        productRepository.saveAll(productList);
        return categoryMapper.toCategoryWithProductsResponse(category);
    }

    public List<CategoryResponse> getListCate(){
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
    }

    public List<CategoryWithProductsResponse> getListCateWithProductResponse(){
        return categoryRepository.findAll().stream().map(categoryMapper::toCategoryWithProductsResponse).toList();
    }

    public void deleteCateById(String id){
        categoryRepository.deleteById(id);
    }
}
