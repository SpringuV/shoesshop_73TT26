package TT26_73.hoseshop.Model;

import TT26_73.hoseshop.Model.Key.KeyWishList;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Builder
@Setter
@Table(name = "wishlist")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Wishlist {

    @EmbeddedId
    KeyWishList keyWishList;

    @CreationTimestamp
    Instant createAt;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("proId")
    @JoinColumn(name = "pro_id")
    Product product;
}
