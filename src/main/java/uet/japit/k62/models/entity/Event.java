package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uet.japit.k62.models.request.ReqCreateEvent;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Event extends BaseEntity{
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String coverImageUrl;
    private String mapImageUrl;
    private Date startTime;
    private Date endTime;
    private Date startSellingTime;
    private Date endSellingTime;
    private Boolean isPopular = false;
    private Boolean isBroadcasting = false;
    private String city;
    private String fullAddress;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "event")
    private Collection<TicketClass> ticketClasses = new ArrayList<TicketClass>();

    @OneToMany(mappedBy = "event")
    private Collection<Booking> bookingList = new ArrayList<Booking>();

    @OneToMany(mappedBy = "event")
    private Collection<Comment> commentList = new ArrayList<Comment>();

    public Event(ReqCreateEvent reqCreateEvent)
    {
        this.name = reqCreateEvent.getName();
        this.description = reqCreateEvent.getDescription();
        this.startSellingTime = new Date(reqCreateEvent.getStartSellingTime());
        this.startTime = new Date(reqCreateEvent.getStartTime());
        this.endSellingTime = new Date(reqCreateEvent.getEndSellingTime());
        this.endTime = new Date(reqCreateEvent.getEndTime());
    }

}
