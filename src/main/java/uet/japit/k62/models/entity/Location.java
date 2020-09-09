package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Location extends BaseEntity{
    private String fullAddress;
    private String city;
    private String district;
    private String commune;

    @ManyToMany
    @JoinTable(name = "location_event",
                joinColumns = @JoinColumn(name = "location_id"),
                inverseJoinColumns = @JoinColumn(name = "event_id"))
    private Collection<Event> eventList = new ArrayList<Event>();
}
