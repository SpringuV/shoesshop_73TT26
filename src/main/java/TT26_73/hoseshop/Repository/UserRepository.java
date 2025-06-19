package TT26_73.hoseshop.Repository;

import TT26_73.hoseshop.Model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u FROM User u WHERE u.username =:username")
    Optional<User> findByUsername(@Param("username") String username);
    boolean existsByUsername(String username);

    @EntityGraph(attributePaths = {"role"}) // tối ưu và tránh n+1 query khi truy vấn role theo user
    List<User> findAllByRole_RoleName(String roleName);

    @Query("SELECT u FROM User u WHERE u.address LIKE '%:address%'")
    List<User> findAllByAddress(@Param("address") String address);
    // or List<User> findAllByAddressContaining(String address);

}
