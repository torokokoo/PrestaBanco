package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.repository.LoanTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanTypeService {
    @Autowired
    private LoanTypeRepository loanTypeRepository;


    public List<LoanType> getAll(){
        return loanTypeRepository.findAll();
    }

    public LoanType getById(int id){
        return loanTypeRepository.findByLoanTypeId(id);
    }
}
