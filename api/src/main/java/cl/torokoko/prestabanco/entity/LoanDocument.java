package cl.torokoko.prestabanco.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "loan_document")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_document_id", unique = true, nullable = false)
    private Long loanDocumentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id")
    private Document document;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_id")
    private Loan loan;

    @Getter @Setter private String file;
    @Getter @Setter private boolean verified;
}
