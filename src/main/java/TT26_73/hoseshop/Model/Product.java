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
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Product {

    @Id
    @Column(name = "pro_id")
    String proId;

    @Column(name = "name_pro", unique = true)
    String nameProduct;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "price")
    double prices;

    @Column(name = "size")
    String size;

    @Column(name = "stock_quantity")
    int stock_quantity;

    @Column(name = "brand")
    String brand;

    @Column(name = "gender")
    String gender;

    @Column(name = "image_path")
    String imagePath;

    @Column(name = "create_at")
    @CreationTimestamp
    Instant createAt;

    @Column(name = "update_at")
    @UpdateTimestamp
    Instant updateAt;

    @OneToMany(mappedBy = "product")
    Set<CartItem> cartItemSet;

    @OneToMany(mappedBy = "product")
    Set<Rating> ratingSet;

    @OneToMany(mappedBy = "product")
    Set<Wishlist> wishlistSet;

    @OneToMany(mappedBy = "product")
    Set<OrderItem> orderItemSet;

    @ManyToMany
    @JoinTable(
            name = "product_category",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    Set<Category> categorySet;
}
