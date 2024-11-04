package cl.torokoko.prestabanco.controller;

import cl.torokoko.prestabanco.entity.Document;
import cl.torokoko.prestabanco.entity.LoanType;
import cl.torokoko.prestabanco.entity.LoanTypeRequierement;
import cl.torokoko.prestabanco.service.LoanTypeRequierementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-type-requierements")
@CrossOrigin("*")
public class LoanTypeRequierementController {
    @Autowired
    LoanTypeRequierementService loanTypeRequierementService;

    @GetMapping("/{id}")
    public List<Document> getRequierementsByLoanTypeId(@PathVariable long id) { return loanTypeRequierementService.getByLoanTypeId(id); }

}
