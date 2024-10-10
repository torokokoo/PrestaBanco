package cl.torokoko.prestabanco.controller;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import cl.torokoko.prestabanco.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin("*")
public class LoanController {
    @Autowired
    LoanService loanService;

    @GetMapping("/")
    public List<Loan> getAll() { return loanService.getAll(); }

    @PostMapping("/")
    public Loan add(@RequestBody Loan loan) {return loanService.newLoan(loan);}

    @PutMapping("/status")
    public Loan updateStatus(@RequestBody Loan loan, @RequestParam int id) {
        return loanService.updateStatus(loan, id);
    }
}
