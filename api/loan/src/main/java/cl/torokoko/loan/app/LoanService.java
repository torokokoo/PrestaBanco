package cl.torokoko.loan.app;

import cl.torokoko.loan.app.LoanRepository;
import cl.torokoko.loan.app.Loan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getAll(){
        return loanRepository.findAll();
    }

    public Loan newLoan(Loan loan){
        System.out.println("Entro aqui");
        System.out.println(loan.getName());
        return loanRepository.save(loan);
    }

    public Loan updateStatus(Loan loan, long statusId) {
        Loan found = loanRepository.findByLoanId(loan.getLoanId());
        found.setStatus(statusId);
        return loanRepository.save(found);
    }

    public Loan getById(long id) {
        return loanRepository.findByLoanId(id);
    }
}
