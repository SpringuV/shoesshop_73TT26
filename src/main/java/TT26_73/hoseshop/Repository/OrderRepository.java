package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, String> {
    List<Orders> findAllByUser_UserId(String userId);
    List<Orders> findAllByPaymentStatus(String paymentStatus);
    List<Orders> findAllByUser_UserIdAndStatus(String userId, String status);
}