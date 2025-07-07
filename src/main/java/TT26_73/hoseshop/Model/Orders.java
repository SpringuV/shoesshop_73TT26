package TT26_73.hoseshop.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.Set;

@Getter
@Builder
@Setter
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    String idOrders;

    @Column(name = "note")
    String note;

    @Column(name = "order_date")
    @CreationTimestamp
    Instant orderDate;

    @Column(name = "status")
    String status; // (shipped, pending, delivered, cancelled)

    @Column(name = "total_price")
    double totalPrice;

    @Column(name = "payment_status")
    String paymentStatus;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, orphanRemoval = true)
    Set<OrderItem> orderItemSet;
}
