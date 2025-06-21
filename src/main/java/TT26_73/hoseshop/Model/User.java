package TT26_73.hoseshop.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.Set;

@Getter
@Builder
@Setter
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    String userId;

    @Column(name = "username", unique = true)
    String username;

    @Column(name = "password")
    String password;

    @Column(name = "full_name")
    String fullname;

    @Column(name = "age")
    int age;

    @Column(name = "address")
    String address;

    @Column(name = "phone", unique = true)
    String phone;

    @Column(name = "email", unique = true)
    String email;

    @Column(name = "image_path")
    String imagePath;

    @Column(name = "create_at")
    @CreationTimestamp
    Instant createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    Instant updateAt;

    @ManyToOne
    @JoinColumn(name = "user_role")
    Role role;

    @OneToMany(mappedBy = "user")
    Set<CartItem> cartItemSet;

    @OneToMany(mappedBy = "user")
    Set<Rating> ratingSet;

    @OneToMany(mappedBy = "user")
    Set<Wishlist> wishlistSet;

    @OneToMany(mappedBy = "user")
    Set<Orders> ordersSet;
}
