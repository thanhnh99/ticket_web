package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category extends BaseEntity{
    private String name;
    private String code;

    @OneToMany(mappedBy = "category")
    private Collection<Event> eventList = new ArrayList<Event>();
}
