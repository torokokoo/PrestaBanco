package cl.torokoko.prestabanco.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "loan_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_type_id", unique = true, nullable = false)
    private Long loanTypeId;

    @Getter @Setter private String name;
    @Column(name = "max_term")
    @Getter @Setter private float maxTerm;

    @Column(name = "min_rate")
    @Getter @Setter private float minRate;

    @Column(name = "max_rate")
    @Getter @Setter private float maxRate;

    @Column(name = "max_funding")
    @Getter @Setter private float maxFunding;
}
