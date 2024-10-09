package cl.torokoko.prestabanco.repository;

import cl.torokoko.prestabanco.entity.LoanType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanTypeRepository extends JpaRepository<LoanType, Long> {
    public LoanType findByLoanTypeId(long id);
}
