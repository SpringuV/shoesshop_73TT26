package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Rating.RatingCreateRequest;
import TT26_73.hoseshop.Dto.Rating.RatingResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.RatingMapper;
import TT26_73.hoseshop.Model.Key.KeyRating;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.Rating;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Repository.ProductRepository;
import TT26_73.hoseshop.Repository.RatingRepository;
import TT26_73.hoseshop.Repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class RatingService {
    RatingRepository ratingRepository;
    UserRepository userRepository;
    ProductRepository productRepository;
    RatingMapper ratingMapper;

    public RatingResponse createRating(RatingCreateRequest request){
    //start check user and product exist
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    // end check user and product exist

    // start create key Rating
        KeyRating keyRating = KeyRating.builder()
                                    .productId(request.getProductId())
                                    .userId(request.getUserId())
                                    .build();
        // ngan chan user danh gia trùng comment
        if(ratingRepository.existsById(keyRating)){
            throw new AppException(ErrorCode.RATING_EXISTED);
        }
    // end create key rating
        Rating ratingEntity = ratingMapper.toRating(request, user, product);
        ratingEntity.setKeyRating(keyRating);

        // save
        ratingRepository.save(ratingEntity);
        return ratingMapper.toResponse(ratingEntity);
    }

    public List<RatingResponse> getListByUserId(String userId){
        return ratingRepository.findAllByUserId(userId).stream().map(ratingMapper::toResponse).toList();
    }

    public List<RatingResponse> getListByProductId(String productId){
        return ratingRepository.findAllByProductId(productId).stream().map(ratingMapper::toResponse).toList();
    }

    public List<RatingResponse> getListRating(){
        return ratingRepository.findAll().stream().map(ratingMapper::toResponse).toList();
    }

    public void deleteRatingByKey(String userId, String productId){
        KeyRating keyRating = KeyRating.builder().userId(userId).productId(productId).build();
        Rating rating = ratingRepository.findById(keyRating).orElseThrow(()-> new AppException(ErrorCode.RATING_NOT_FOUND));
        ratingRepository.delete(rating);
    }

}
