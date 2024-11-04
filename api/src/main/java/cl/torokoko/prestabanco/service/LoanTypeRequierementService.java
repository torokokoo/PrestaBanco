package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.Document;
import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.entity.LoanTypeRequierement;
import cl.torokoko.prestabanco.repository.LoanTypeRequierementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanTypeRequierementService {
    @Autowired
    private LoanTypeRequierementRepository loanTypeRequierementRepository;

    public List<Document> getByLoanTypeId(long loanType){
        return loanTypeRequierementRepository.getDocumentsByLoanType(loanType);
    }
}
