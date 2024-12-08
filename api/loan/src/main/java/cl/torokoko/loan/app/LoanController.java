package cl.torokoko.loan.app;


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

    // Simple testing route: http://URL:PORT/api/loans/hello/
    @GetMapping("/hello/")
    public String helloWorld() { return "Hello World!";}

    @GetMapping("/{id}")
    public Loan getById(@PathVariable long id) { return loanService.getById(id); }

    @PostMapping("/")
    public Loan add(@RequestBody Loan loan) {return loanService.newLoan(loan);}

    @PutMapping("/status")
    public Loan updateStatus(@RequestBody Loan loan, @RequestParam long id) {
        return loanService.updateStatus(loan, id);
    }
}