package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Product.ProductCreateRequest;
import TT26_73.hoseshop.Dto.Product.ProductCreateResponse;
import TT26_73.hoseshop.Dto.Product.ProductResponse;
import TT26_73.hoseshop.Service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {
    ProductService productService;

    @PostMapping
    ApiResponse<ProductCreateResponse> createResponseApi(@Valid @RequestBody ProductCreateRequest productCreateRequest){
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
    ApiResponse<ProductResponse> getProductById(@PathVariable String id){
        return ApiResponse.<ProductResponse>builder()
                .message("Get Product")
                .result(productService.getProductById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteProductById(@PathVariable String id){
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }
}
