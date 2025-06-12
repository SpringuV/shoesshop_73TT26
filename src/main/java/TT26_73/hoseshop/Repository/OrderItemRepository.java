package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.Key.KeyOrderItem;
import TT26_73.hoseshop.Model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, KeyOrderItem> {

    @Query("SELECT odi FROM OrderItem odi WHERE odi.orders.idOrders =:idOrders")
    List<OrderItem> findAllByOrder_IdOrders(@Param("idOrders") String idOrders);

    @Query("SELECT odi FROM OrderItem odi WHERE odi.product.proId =:proId")
    List<OrderItem> findAllByProduct_IdPro(@Param("proId") String proId);

    @Query("SELECT odi FROM OrderItem odi WHERE odi.orders.idOrders =:idOrders AND odi.product.proId =:proId")
    List<OrderItem> findAllByOrder_IdOrdersAndProduct_IdPro(@Param("idOrders") String idOrders,@Param("proId") String proId);

}
