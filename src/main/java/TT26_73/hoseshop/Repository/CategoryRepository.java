package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

    Optional<Category> findByNameCate(String nameCate);
}
