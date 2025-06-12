package TT26_73.hoseshop.Dto.User;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserUpdateRequest {
    String email;
    String fullname;
    int age;
    String address;
    String phone;
}
