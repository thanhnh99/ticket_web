package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseEntity{
    @Email
    @UniqueElements
    private String email;
    private String password;
    private String username;
    private String provider;
    private String provider_id;


    @ManyToMany(mappedBy = "userList")
    private Collection<Role> roleList = new ArrayList<Role>();

    @ManyToMany(mappedBy = "userList")
    private Collection<Permission> permissionList = new ArrayList<Permission>();
}
