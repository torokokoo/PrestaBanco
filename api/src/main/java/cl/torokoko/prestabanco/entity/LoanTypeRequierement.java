package cl.torokoko.prestabanco.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "loan_type_requierement")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanTypeRequierement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_type_requierement_id", unique = true, nullable = false)
    private Long loanTypeRequierementId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "document_id")
    private Document document;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "loan_type_id")
    private LoanType loanType;

    @Getter @Setter private boolean active;
}
