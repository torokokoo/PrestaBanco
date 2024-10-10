package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import cl.torokoko.prestabanco.repository.LoanRepository;
import cl.torokoko.prestabanco.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private StatusRepository statusRepository;

    public List<Loan> getAll(){
        return loanRepository.findAll();
    }

    public Loan newLoan(Loan loan){
        return loanRepository.save(loan);
    }

    public Loan updateStatus(Loan loan, int statusId) {
        Loan found = loanRepository.findByLoanId(loan.getLoanId());
        Status status = statusRepository.findByStatusId(statusId);
        found.setStatus(status);
        return loanRepository.save(found);
    }
}
