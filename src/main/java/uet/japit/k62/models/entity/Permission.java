package uet.japit.k62.models.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Permission extends BaseEntity{
    private String displayName;
    private String code;

    @ManyToMany(mappedBy = "permissionList", fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<User> userList = new ArrayList<User>();}
