package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Product.ProductCreateRequest;
import TT26_73.hoseshop.Dto.Product.ProductCreateResponse;
import TT26_73.hoseshop.Dto.Product.ProductResponse;
import TT26_73.hoseshop.Dto.Product.ProductUpdateRequest;
import TT26_73.hoseshop.Service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @PostMapping
    ApiResponse<ProductCreateResponse> createResponseApi(@Valid @ModelAttribute  ProductCreateRequest productCreateRequest){
        return ApiResponse.<ProductCreateResponse>builder()
                .message("Create Product")
                .result(productService.productCreate(productCreateRequest))
                .build();
    }

    @GetMapping
    ApiResponse<List<ProductResponse>> getListProduct(){
        return ApiResponse.<List<ProductResponse>>builder()
                .message("Get List Product")
                .result(productService.getListProduct())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<ProductResponse> getProductById(@PathVariable("id") String id){
        return ApiResponse.<ProductResponse>builder()
                .message("Get Product")
                .result(productService.getProductById(id))
                .build();
    }

    @GetMapping("/filter-nameCate/{nameCate}")
    ApiResponse<List<ProductResponse>> filterByNameCategory(@PathVariable("nameCate") String nameCate){
        return ApiResponse.<List<ProductResponse>>builder()
                .message("Filter By NameCate")
                .result(productService.filterByNameCategory(nameCate))
                .build();
    }

    @GetMapping("filter-brand/{brand}")
    ApiResponse<List<ProductResponse>> filterByBrand(@PathVariable("brand") String brand){
        return ApiResponse.<List<ProductResponse>>builder()
                .message("Filter By Brand")
                .result(productService.filterByBrand(brand))
                .build();
    }

    @GetMapping("filter-gender/{gender}")
    ApiResponse<List<ProductResponse>> filterByGender(@PathVariable("gender") String gender){
        return ApiResponse.<List<ProductResponse>>builder()
                .message("Filter By Gender")
                .result(productService.filterByGender(gender))
                .build();
    }

    @PutMapping
    ApiResponse<ProductResponse> modifyProduct(@ModelAttribute ProductUpdateRequest request){
        return ApiResponse.<ProductResponse>builder()
                .message("Update Product")
                .result(productService.updateProduct(request))
                .build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteProductById(@PathVariable String id) throws IOException {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }
}
