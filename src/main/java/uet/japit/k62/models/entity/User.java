package uet.japit.k62.models.entity;

import lombok.*;
import uet.japit.k62.constant.AccountTypeConstant;
import uet.japit.k62.constant.PermissionConstant;
import uet.japit.k62.models.auth.GranAuthorityImpl;

import javax.persistence.*;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseEntity{
    private String email;
    private String password;
    private String displayName;
    private String provider;
    private String provider_id;


//    @ManyToMany(mappedBy = "userList")
//    private Collection<Role> roleList = new ArrayList<Role>();

    @ManyToOne
    @JoinColumn(name = "account_type_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private AccountType accountType;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_permission",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id"))
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Permission> permissionList = new ArrayList<Permission>();

    public User(String displayName, String password, String email, Boolean isActive)
    {
        this.permissionList = new ArrayList<Permission>();
        this.displayName = displayName;
        this.password = password;
        this.email = email;
        this.setIsActive(isActive);
    }

    public List<GranAuthorityImpl> getPermissionAuthority(){
        return this.permissionList.stream().map(permission -> {
            return new GranAuthorityImpl(permission.getCode());
        }).collect(Collectors.toList());
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

    public void setPermissionList(List<Permission> permissionList)
    {
        this.permissionList = new ArrayList<Permission>();
        for(Permission permission : permissionList)
        {
            this.permissionList.add(permission);
        }
    }

    public void addPermission(Permission permission)
    {
        this.permissionList.add(permission);
    }
}
