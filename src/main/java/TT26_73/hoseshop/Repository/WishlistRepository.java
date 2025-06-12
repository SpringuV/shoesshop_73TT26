package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.Key.KeyWishList;
import TT26_73.hoseshop.Model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, KeyWishList> {
    List<Wishlist> findAllByUser_UserId(String userId);
}
