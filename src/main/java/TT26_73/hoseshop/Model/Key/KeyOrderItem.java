package TT26_73.hoseshop.Model.Key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Embeddable
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Setter
public class KeyOrderItem implements Serializable {

    @Column(name = "order_id")
    String orderId;

    @Column(name = "pro_id")
    String productId;
}
