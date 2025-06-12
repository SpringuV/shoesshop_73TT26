package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.Key.KeyRating;
import TT26_73.hoseshop.Model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, KeyRating> {
    @Query("SELECT rt FROM Rating rt  WHERE rt.user.userId =:userId")
    List<Rating> findAllByUserId(@Param("userId") String userId);

    @Query("SELECT rt FROM Rating rt  WHERE rt.product.proId =:proId")
    List<Rating> findAllByProductId(@Param("proId") String productId);
}
