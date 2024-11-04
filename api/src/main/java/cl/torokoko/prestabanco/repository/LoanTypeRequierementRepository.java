package cl.torokoko.prestabanco.repository;

import cl.torokoko.prestabanco.entity.Document;
import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.entity.LoanTypeRequierement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanTypeRequierementRepository extends JpaRepository<LoanTypeRequierement, Long> {
    public LoanTypeRequierement findByLoanTypeRequierementId(long id);
    @Query("SELECT d FROM LoanTypeRequierement ltr JOIN ltr.document d WHERE ltr.loanType.loanTypeId = :loanTypeId")
    public List<Document> getDocumentsByLoanType(@Param("loanTypeId") long loanTypeId);
    public List<LoanTypeRequierement> findByActiveTrue();
}
