package TT26_73.hoseshop.Dto.User;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserChangePasswordResponse {
    boolean isChanged;
}
