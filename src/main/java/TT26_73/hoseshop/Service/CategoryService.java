package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Category.CategoryUpdateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryCreateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryWithProductsResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.CategoryMapper;
import TT26_73.hoseshop.Model.Category;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Repository.CategoryRepository;
import TT26_73.hoseshop.Repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);
    @PersistenceContext
    EntityManager entityManager;
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;
    ProductRepository productRepository;

    public CategoryWithProductsResponse createCategory(CategoryCreateRequest request){
        // start check cate existed
        if(categoryRepository.findByNameCate(request.getNameCate()).isPresent()){
            throw new AppException(ErrorCode.CATEGORY_EXISTED);
        }
        // end check cate existed
        Category category = categoryMapper.toCategoryFromCreateRequest(request);
//        List<Product> productList = productRepository.f

        categoryRepository.save(category);
        return categoryMapper.toCategoryWithProductsResponse(category);
    }

    public List<CategoryWithProductsResponse> getCategoryWithProductResponse(String idCate){
        return categoryRepository.findById(idCate).stream().map(categoryMapper::toCategoryWithProductsResponse).toList();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public CategoryWithProductsResponse updateCate(String cateId, CategoryUpdateRequest request){
        // vì mapped by category nên bên product mới là chủ sở hữu (owning side), nghĩa là product là bên chủ động lưu trữ dữ liệu,
        // category là bên bị ánh xạ (inverse side) sẽ không chịu trách nhiệm cập nhật bảng trung gian
        Category category = categoryRepository.findById(cateId).orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        // lay danh sach product hien tai productCategory
        List<Product> oldListProduct = category.getProductSet().stream().toList();
        log.info("Size trước khi update: {}", oldListProduct.size());
        // xóa category không còn trong request
        for(Product oldProduct : oldListProduct){
            if(!request.getProductIds().contains(oldProduct.getProId())){
                oldProduct.getCategorySet().remove(category);
                productRepository.save(oldProduct);
            }
        }

        // thêm các product vào category
        List<Product> newProductList = productRepository.findAllById(request.getProductIds());
        if(newProductList.size() != request.getProductIds().size()){
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        for(Product newProduct : newProductList){
            // check bị trùng category đã tồn tại trong product
            boolean alreadyLinked = newProduct.getCategorySet().stream().anyMatch(cateFromRequest -> cateFromRequest.getId().equals(category.getId()));
            if(!alreadyLinked){
                newProduct.getCategorySet().add(category); // cap nhat ben owing side
                productRepository.save(newProduct);
            }
        }
        category.setNameCate(request.getNameCate());
        categoryRepository.saveAndFlush(category);
        entityManager.refresh(category); // cập nhật lại trạng thái mới nhất
        return categoryMapper.toCategoryWithProductsResponse(category);
    }

    public List<CategoryWithProductsResponse> getListCate(){
        return categoryRepository.findAll().stream().map(categoryMapper::toCategoryWithProductsResponse).toList();
    }

    public CategoryWithProductsResponse getCateByName(String nameCate){
        return categoryMapper.toCategoryWithProductsResponse(categoryRepository.findByNameCate(nameCate).orElseThrow(()-> new AppException(ErrorCode.CATEGORY_NOT_FOUND)));
    }

    public void deleteCateById(String id){
        try{
            Category category = categoryRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            // xóa các category khỏi product
            category.getProductSet().forEach(product -> {
                product.getCategorySet().remove(category);
                productRepository.save(product);
            });
            categoryRepository.delete(category);
        } catch (EmptyResultDataAccessException ex){
            throw  new AppException(ErrorCode.ORDERS_NOT_FOUND);
        }

    }
}
