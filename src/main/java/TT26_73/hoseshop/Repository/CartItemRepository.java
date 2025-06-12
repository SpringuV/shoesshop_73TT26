package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.CartItem;
import TT26_73.hoseshop.Model.Key.KeyCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, KeyCartItem> {

    List<CartItem> findAllByUser_UserId(String userId);

}
