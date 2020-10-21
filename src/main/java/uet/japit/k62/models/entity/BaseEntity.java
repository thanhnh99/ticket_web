package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.Date;
import java.util.UUID;

@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseEntity {
    @Id
    private String id = UUID.randomUUID().toString();
    private long createdAt = new Date().getTime();
    private String createdBy;
    private long updatedAt = new Date().getTime();
    private String updatedBy;
    private Boolean isActive = true;
}