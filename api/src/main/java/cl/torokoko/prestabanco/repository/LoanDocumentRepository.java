package cl.torokoko.prestabanco.repository;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.LoanDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanDocumentRepository extends JpaRepository<LoanDocument, Long> {
    public LoanDocument findByLoanDocumentId(long id);
    public List<LoanDocument> findByLoan(Loan loanId);
}
