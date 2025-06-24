package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.CartItem.CartItemCreateRequest;
import TT26_73.hoseshop.Dto.CartItem.CartItemResponse;
import TT26_73.hoseshop.Dto.CartItem.UpdateCartItemRequest;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.CartItemMapper;
import TT26_73.hoseshop.Model.CartItem;
import TT26_73.hoseshop.Model.Key.KeyCartItem;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Model.User;
import TT26_73.hoseshop.Repository.CartItemRepository;
import TT26_73.hoseshop.Repository.ProductRepository;
import TT26_73.hoseshop.Repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
public class CartItemService {

    @PersistenceContext
    EntityManager entityManager;
    CartItemMapper cartItemMapper;
    UserRepository userRepository;
    ProductRepository productRepository;
    CartItemRepository cartItemRepository;

    public CartItemResponse createCartItem(CartItemCreateRequest request){
    // start check user and product exist
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    // end check user and product exist
    // start create key cart item
        KeyCartItem keyCartItem = KeyCartItem.builder()
                .productId(request.getProductId())
                .userId(request.getUserId())
                .build();
        // check key existed ?
        if(cartItemRepository.existsById(keyCartItem)){
            throw new AppException(ErrorCode.CART_ITEM_EXISTED);
        }
    // end create key cart item
        CartItem cartItemEntity = cartItemMapper.toCartItem(request,user,product);
        cartItemEntity.setKeyCartItem(keyCartItem);

        // save
        cartItemRepository.save(cartItemEntity);
        return cartItemMapper.toResponse(cartItemEntity);
    }

    //update
    public List<CartItemResponse> updateCartItem(UpdateCartItemRequest request){
        System.out.println(request.getQuantity());
        // start check user and product exist
        User user = userRepository.findById(request.getUserId()).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        // end check user and product exist
        // start create key cart item
        KeyCartItem keyCartItem = KeyCartItem.builder()
                .productId(request.getProductId())
                .userId(request.getUserId())
                .build();
        // check key existed ?
        CartItem cartItem = cartItemRepository.findById(keyCartItem).orElseThrow(()-> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);
        return  getListCartItemByUser(user.getUserId());
    }

    public List<CartItemResponse> getListCartItemByUser(String userId){
        return cartItemRepository.findAllByUser_UserId(userId).stream().map(cartItemMapper::toResponse).toList();
    }

    public void deleteCartItemByKey(String userId, String proId){
        KeyCartItem keyCartItem = KeyCartItem.builder().userId(userId).productId(proId).build();
        CartItem cartItem = cartItemRepository.findById(keyCartItem).orElseThrow(()-> new AppException(ErrorCode.CART_ITEM_NOT_FOUND));
        cartItemRepository.delete(cartItem);
    }
}
