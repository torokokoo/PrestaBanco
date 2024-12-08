package cl.torokoko.loan_type.app;

import cl.torokoko.loan_type.app.LoanType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanTypeRepository extends JpaRepository<LoanType, Long> {
    public LoanType findByLoanTypeId(long id);
}
