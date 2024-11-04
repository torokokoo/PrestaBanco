package cl.torokoko.prestabanco.controller;

import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.service.LoanTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-types")
@CrossOrigin("*")
public class LoanTypeController {
    @Autowired
    LoanTypeService loanTypeService;

    @GetMapping("/")
    public List<LoanType> getAll() { return loanTypeService.getAll(); }

    @GetMapping("/{id}")
    public LoanType getLoan(@PathVariable int id) { return loanTypeService.getById(id); }

}
