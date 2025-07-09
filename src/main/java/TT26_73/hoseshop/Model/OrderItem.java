package TT26_73.hoseshop.Model;

import TT26_73.hoseshop.Model.Key.KeyOrderItem;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Builder
@Setter
@Table(name = "orders_item")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class OrderItem {

    @EmbeddedId
    KeyOrderItem keyOrderItem;

    @Column(name = "quantity")
    int quantity;

    @Column(name = "price")
    double price;

    @Column(name = "unit")
    String unit;

    @Column(name = "size")
    String size;

    @Column(name = "discount")
    double discount;

    @CreationTimestamp
    Instant createAt;

    @CreationTimestamp
    Instant updateAt;

    @ManyToOne
    @MapsId("orderId") //Không bị lỗi ánh xạ trùng / Gán order hoặc product sẽ tự động cập nhật keyOrderItem / Dễ quản lý và ít bug hơn khi dùng trong thực tế.
    @JoinColumn(name = "order_id")
    Orders orders;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "pro_id")
    Product product;
}
