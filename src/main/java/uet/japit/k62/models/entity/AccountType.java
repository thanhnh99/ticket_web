package uet.japit.k62.models.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AccountType extends BaseEntity{
    private String name;

    @Column(unique = true)
    private String code;

    @OneToMany(mappedBy = "accountType")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<User> ticketClasses = new ArrayList<User>();
//
//    @ManyToMany
//    @JoinTable(name = "user_role",
//                joinColumns = @JoinColumn(name = "role_id"),
//                inverseJoinColumns = @JoinColumn(name = "user_id"))
//    private Collection<User> userList = new ArrayList<User>();
}
