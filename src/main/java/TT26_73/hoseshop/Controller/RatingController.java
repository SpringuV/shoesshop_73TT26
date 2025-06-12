package TT26_73.hoseshop.Controller;

import TT26_73.hoseshop.Dto.ApiResponse;
import TT26_73.hoseshop.Dto.Rating.RatingCreateRequest;
import TT26_73.hoseshop.Dto.Rating.RatingResponse;
import TT26_73.hoseshop.Service.RatingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingController {

    RatingService ratingService;

    @PostMapping
    ApiResponse<RatingResponse> createRating(@RequestBody RatingCreateRequest request){
        return ApiResponse.<RatingResponse>builder()
                .message("Create Rating")
                .result(ratingService.createRating(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<RatingResponse>> getListRating(){
        return ApiResponse.<List<RatingResponse>>builder()
                .message("Get List")
                .result(ratingService.getListRating())
                .build();
    }

    @GetMapping("/{userId}")
    ApiResponse<List<RatingResponse>> getListByUserId(@PathVariable("userId") String userId){
        return ApiResponse.<List<RatingResponse>>builder()
                .message("Get List By User")
                .result(ratingService.getListByUserId(userId))
                .build();
    }

    @GetMapping("/{productId}")
    ApiResponse<List<RatingResponse>> getListByProductId(@PathVariable("productId") String productId){
        return ApiResponse.<List<RatingResponse>>builder()
                .message("Get List By Product")
                .result(ratingService.getListByProductId(productId))
                .build();
    }

    @DeleteMapping("/{userID}/{productId}")
    ResponseEntity<Void> deleteByKeyRating(@PathVariable("userId") String userId,@PathVariable("productId") String productId){
        ratingService.deleteRatingByKey(userId,productId);
        return ResponseEntity.noContent().build();
    }
}
