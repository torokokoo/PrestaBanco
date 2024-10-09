package cl.torokoko.prestabanco.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id", unique = true, nullable = false)
    private Long statusId;

    @Getter @Setter private String name;
    @Getter @Setter private String description;
    @Getter @Setter private boolean active;
}
