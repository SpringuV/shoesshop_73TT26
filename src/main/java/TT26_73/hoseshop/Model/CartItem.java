package TT26_73.hoseshop.Model;

import TT26_73.hoseshop.Model.Key.KeyCartItem;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Builder
@Setter
@Table(name = "carts_item")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class CartItem {

    @EmbeddedId
    KeyCartItem keyCartItem;

    @Column(name = "create_at")
    @CreationTimestamp
    Instant createAt;

    @Column(name = "quantity")
    int quantity;

    @Column(name = "size")
    String size;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "pro_id")
    Product product;
}
