package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Category.CategoryCreateRequest;
import TT26_73.hoseshop.Dto.Category.CategoryUpdateRequest;
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
    ApiResponse<CategoryWithProductsResponse> createCate(@RequestBody CategoryCreateRequest request){
        return ApiResponse.<CategoryWithProductsResponse>builder()
                .message("Create Cate")
                .result(categoryService.createCategory(request))
                .build();
    }

    @PutMapping("/{cateId}")
    ApiResponse<CategoryWithProductsResponse> updateCategory(@PathVariable("cateId") String cateId,@RequestBody CategoryUpdateRequest request){
        return ApiResponse.<CategoryWithProductsResponse>builder()
                .message("Update Products To Cate")
                .result(categoryService.updateCate(cateId, request))
                .build();
    }

    @GetMapping
    ApiResponse<List<CategoryWithProductsResponse>> getListCate(){
        return ApiResponse.<List<CategoryWithProductsResponse>>builder()
                .message("Get List Cate")
                .result(categoryService.getListCate())
                .build();
    }

    @GetMapping("/{cateId}")
    ApiResponse<List<CategoryWithProductsResponse>> getCategory(@PathVariable("cateId") String cateId){
        return ApiResponse.<List<CategoryWithProductsResponse>>builder()
                .message("Get Cate with Product Response")
                .result(categoryService.getCategoryWithProductResponse(cateId))
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
