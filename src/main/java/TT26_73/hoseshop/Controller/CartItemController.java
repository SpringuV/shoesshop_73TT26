package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.CartItem.CartItemCreateRequest;
import TT26_73.hoseshop.Dto.CartItem.CartItemResponse;
import TT26_73.hoseshop.Service.CartItemService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartItemController {
    CartItemService cartItemService;

    @PostMapping
    ApiResponse<CartItemResponse> createCartItem(@RequestBody CartItemCreateRequest request){
        return ApiResponse.<CartItemResponse>builder()
                .message("Create Cart Item")
                .result(cartItemService.createCartItem(request))
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<List<CartItemResponse>> getListCartById(@PathVariable("userId") String userId){
        return ApiResponse.<List<CartItemResponse>>builder()
                .message("Get List Cart Item")
                .result(cartItemService.getListCartItemByUser(userId))
                .build();
    }

    @DeleteMapping("/{userId}/{productId}")
    ResponseEntity<Void> deleteCartItem(@PathVariable("userId") String userId,@PathVariable("productId") String productId){
        cartItemService.deleteCartItemByKey(userId, productId);
        return ResponseEntity.noContent().build();
    }
}
