package TT26_73.hoseshop.Model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Getter
@Builder
@Setter
@Table(name = "permission")
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class Permission {

    @Id
    @Column(name = "permission_name")
    String permissionName;


    @Column(name = "description")
    String description;

    @ManyToMany(mappedBy = "permissionSet")
    Set<Role> roleSet;
}
