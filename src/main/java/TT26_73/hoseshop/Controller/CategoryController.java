package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Category.CategoryCreateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryResponse;
import TT26_73.hoseshop.Dto.Category.CategoryWithProductsResponse;
import TT26_73.hoseshop.Service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @PostMapping
    ApiResponse<CategoryResponse> createCate(@RequestBody CategoryCreateRequest request){
        return ApiResponse.<CategoryResponse>builder()
                .message("Create Cate")
                .result(categoryService.createCategory(request))
                .build();
    }

    @PostMapping("/{cateId}/products")
    ApiResponse<CategoryWithProductsResponse> addProductToCate(@PathVariable("cateId") String cateId, Set<String> productIds){
        return ApiResponse.<CategoryWithProductsResponse>builder()
                .message("Add Products To Cate")
                .result(categoryService.addProductIntoCate(cateId, productIds))
                .build();
    }

    @GetMapping
    ApiResponse<List<CategoryResponse>> getListCate(){
        return ApiResponse.<List<CategoryResponse>>builder()
                .message("Get List Cate")
                .result(categoryService.getListCate())
                .build();
    }

    @GetMapping("/products")
    ApiResponse<List<CategoryWithProductsResponse>> getListCateWithProduct(){
        return ApiResponse.<List<CategoryWithProductsResponse>>builder()
                .message("Get List Cate With Product")
                .result(categoryService.getListCateWithProductResponse())
                .build();
    }

    @DeleteMapping("/{idCate}")
    ResponseEntity<Void> deleteCate(@PathVariable("idCate") String idCate){
        categoryService.deleteCateById(idCate);
        return ResponseEntity.noContent().build();
    }
}
