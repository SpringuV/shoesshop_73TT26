package TT26_73.hoseshop.Model;

import TT26_73.hoseshop.Model.Key.KeyRating;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Builder
@Setter
@Table(name = "rating")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Rating {

    @EmbeddedId
    KeyRating keyRating;

    @Column(name = "content")
    String content;

    @Column(name = "rate_point")
    @Min(0)
    @Max(5)
    int ratePoint;

    @CreationTimestamp
    Instant create_at;

    @CreationTimestamp
    Instant update_at;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "pro_id")
    Product product;
}
