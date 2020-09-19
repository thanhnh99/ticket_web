package uet.japit.k62.models.response.data_response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResLogin {
    String token;
    List<GrantedAuthority> permissionList;
    List<String> roleList;
}
