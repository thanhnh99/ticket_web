package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;
import uet.japit.k62.models.auth.GranAuthorityImpl;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseEntity{
    @Email
    @UniqueElements
    private String email;
    private String password;
    private String displayName;
    private String provider;
    private String provider_id;


    @ManyToMany(mappedBy = "userList")
    private Collection<Role> roleList = new ArrayList<Role>();

    @ManyToMany(mappedBy = "userList")
    private Collection<Permission> permissionList = new ArrayList<Permission>();

    public User(String displayName, String password, String email, Boolean isActive)
    {
        this.roleList = new ArrayList<Role>();
        this.permissionList = new ArrayList<Permission>();
        this.displayName = displayName;
        this.password = password;
        this.email = email;
        this.setIsActive(isActive);
    }
    public void addRole(Role role)
    {
        this.roleList.add(role);
    }

    public List<GranAuthorityImpl> getPermissionAuthority(){
        return this.permissionList.stream().map(permission -> {
            return new GranAuthorityImpl(permission.getCode());
        }).collect(Collectors.toList());
    }

    public List<String> getRoles()
    {
        List<Role> roles = (List<Role>) this.roleList;
        List<String> listRole = new ArrayList<>();
        for (Role role : roles)
        {
            listRole.add(role.getCode());
        }
        return listRole;
    }

    public List<String> getPermissionStringList()
    {
        List<Permission> permissionList = (List<Permission>) this.permissionList;
        List<String> permissionStringList = new ArrayList<String>();
        for (Permission permission : permissionList)
        {
            permissionStringList.add(permission.getCode());
        }
        return permissionStringList;
    }
}
