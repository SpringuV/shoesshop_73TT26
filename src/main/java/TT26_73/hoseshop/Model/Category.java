package TT26_73.hoseshop.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Builder
@Setter
@Table(name = "category")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "name_cate", unique = true)
    String nameCate;

    @ManyToMany(mappedBy = "categorySet")
    Set<Product> productSet;
}
