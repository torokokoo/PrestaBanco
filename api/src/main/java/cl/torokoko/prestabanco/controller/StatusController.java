package cl.torokoko.prestabanco.controller;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import cl.torokoko.prestabanco.service.LoanService;
import cl.torokoko.prestabanco.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/status")
@CrossOrigin("*")
public class StatusController {
    @Autowired
    StatusService statusService;

    @GetMapping("/")
    public List<Status> getAll() { return statusService.getAll(); }
}
