package uet.japit.k62.models.entity;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.Date;
import java.util.UUID;

@MappedSuperclass
@Data
public abstract class BaseEntity {
    @Id
    private String id = UUID.randomUUID().toString();
    private Date createdAt = new Date();
    private String createdBy;
    private Date updatedAt = new Date();
    private String updatedBy;
    private Boolean isActive = true;
}