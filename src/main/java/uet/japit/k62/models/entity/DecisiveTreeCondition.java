package uet.japit.k62.models.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DecisiveTreeCondition extends BaseEntity{
    String outlook;
    String temp;
    String wind;
    String date;
    String watching;
}
