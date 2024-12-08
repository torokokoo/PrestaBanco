package cl.torokoko.loan.app;

import cl.torokoko.loan.app.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    public Loan findByLoanId(long id);
    public List<Loan> findByStatus(long statusId);
}
