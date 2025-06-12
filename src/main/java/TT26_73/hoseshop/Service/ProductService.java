package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Product.ProductCreateRequest;
import TT26_73.hoseshop.Dto.Product.ProductCreateResponse;
import TT26_73.hoseshop.Dto.Product.ProductResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.ProductMapper;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class ProductService {
    ProductRepository productRepository;
    ProductMapper productMapper;


    public ProductCreateResponse productCreate(ProductCreateRequest request){
        // check exist
        if(productRepository.existsById(request.getProductId())){
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }
        Product product = productMapper.toProductFromCreateRequest(request);
        product.setCreate_at(Instant.now());

        // save
        productRepository.save(product);
        return productMapper.toCreateResponse(product);
    }

    public List<ProductResponse>  filterByNameCategory(String categoryName){
        return productRepository.findAllByCategorySet_NameCateOrderByPricesAsc(categoryName).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> filterByBrand(String brand){
        return productRepository.findAllByBrandOrderByPricesAsc(brand).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> filterByGender(String gender){
        return productRepository.findAllByGenderOrderByPricesAsc(gender).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> getListProduct(){
        return productRepository.findAll().stream().map(productMapper::toProductResponse).toList();
    }

    public ProductResponse getProductById(String id){
        return productMapper.toProductResponse(productRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public void deleteProductById(String id){
        productRepository.deleteById(id);
    }
}
