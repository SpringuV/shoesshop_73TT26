package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findAllByCategorySet_NameCateOrderByPricesAsc(String categoryName);
    List<Product> findAllByGenderOrderByPricesAsc(String gender);
    List<Product> findAllByBrandOrderByPricesAsc(String brand);

}
