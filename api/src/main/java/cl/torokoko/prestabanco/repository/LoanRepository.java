package cl.torokoko.prestabanco.repository;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    public Loan findByLoanId(long id);
    public List<Loan> findByStatus(Status statusId);
}
