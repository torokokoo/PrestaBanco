package cl.torokoko.prestabanco.repository;

import cl.torokoko.prestabanco.entity.LoanTypeRequierement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanTypeRequierementRepository extends JpaRepository<LoanTypeRequierement, Long> {
    public LoanTypeRequierement findByLoanTypeRequierementId(long id);
    public List<LoanTypeRequierement> findByActiveTrue();
}
