package cl.torokoko.prestabanco.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "loan")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id", unique = true, nullable = false)
    private Long loanId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "loan_type_id")
    private LoanType loanType;

    @Getter @Setter private String name;
    @Getter @Setter private String rut;
    @Getter @Setter private String email;
    @Getter @Setter private String address;
    @Getter @Setter private int balance;
    @Getter @Setter private Date birthdate;

    @Column(name = "requested_term")
    @Getter @Setter private int requestedTerm;

    @Column(name = "requested_rate")
    @Getter @Setter private int requestedRate;

    @Column(name = "requested_funding")
    @Getter @Setter private int requestedFunding;

    @Column(name = "created_at")
    @Getter @Setter private Date createdAt;

    @Column(name = "updated_at")
    @Getter @Setter private Date updatedAt;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "status_id")
    @Getter @Setter private Status status;
}
