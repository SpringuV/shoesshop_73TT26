package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.WishList.WishListCreateRequest;
import TT26_73.hoseshop.Dto.WishList.WishListCreateResponse;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.WishListMapper;
import TT26_73.hoseshop.Model.Key.KeyWishList;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Model.Wishlist;
import TT26_73.hoseshop.Repository.ProductRepository;
import TT26_73.hoseshop.Repository.UserRepository;
import TT26_73.hoseshop.Repository.WishlistRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class WishListService {
    WishlistRepository wishlistRepository;
    WishListMapper wishListMapper;
    UserRepository userRepository;
    ProductRepository productRepository;


    public WishListCreateResponse toggleWishList(WishListCreateRequest request){
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        KeyWishList keyWishList = KeyWishList.builder().productId(request.getProductId()).userId(request.getUserId()).build();
        WishListCreateResponse wishListCreateResponse;
        if(wishlistRepository.existsById(keyWishList)){
            // neu da thích thi xóa khỏi wishlist
            try{
                wishlistRepository.deleteById(keyWishList);
            } catch (EmptyResultDataAccessException ex){
                throw new AppException(ErrorCode.WISH_LIST_NOT_FOUND);
            }
            wishListCreateResponse = WishListCreateResponse.builder()
                    .createAt(null)
                    .productWishListResponse(wishListMapper.toProductWishListResponse(product))
                    .userWishListResponse(wishListMapper.toUserWishListResponse(user))
                    .isLiked(false)
                    .build();
        } else {
            // nếu chưa thích, thì thêm vào danh sách yêu thích
            Wishlist wishlist = wishListMapper.toEntityFromCreateRequest(request, user, product);
            wishlistRepository.save(wishlist);
            wishListCreateResponse = WishListCreateResponse.builder()
                    .createAt(wishlist.getCreateAt())
                    .productWishListResponse(wishListMapper.toProductWishListResponse(product))
                    .userWishListResponse(wishListMapper.toUserWishListResponse(user))
                    .isLiked(true)
                    .build();
        }
        return wishListCreateResponse;
    }

    public List<WishListCreateResponse> getListWishByUserId(String userId){
        return wishlistRepository.findAllByUser_UserId(userId).stream().map(wishlist -> WishListCreateResponse.builder()
                .createAt(wishlist.getCreateAt())
                .productWishListResponse(wishListMapper.toProductWishListResponse(wishlist.getProduct()))
                .userWishListResponse(wishListMapper.toUserWishListResponse(wishlist.getUser()))
                .isLiked(true)
                .build())
                .toList();
    }
}
