package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.WishList.WishListCreateRequest;
import TT26_73.hoseshop.Dto.WishList.WishListCreateResponse;
import TT26_73.hoseshop.Service.WishListService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wish-lists")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WishListController {
    WishListService wishListService;

    @PostMapping
    ApiResponse<WishListCreateResponse> createWishList(@RequestBody WishListCreateRequest request){
        return ApiResponse.<WishListCreateResponse>builder()
            .result(wishListService.toggleWishList(request))
            .build();
    }

    @GetMapping("{userId}")
    ApiResponse<List<WishListCreateResponse>> getListWishList(@PathVariable("userId") String userId){
        return ApiResponse.<List<WishListCreateResponse>>builder()
                .result(wishListService.getListWishByUserId(userId))
                .build();
    }
}
