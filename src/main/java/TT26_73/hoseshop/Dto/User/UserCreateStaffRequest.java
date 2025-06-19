package TT26_73.hoseshop.Dto.User;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserCreateStaffRequest {
    String username;
    String password;
    String email;
    String fullname;
    int age;
    String address;
    String phone;
    MultipartFile image;
}
