package cl.torokoko.prestabanco.service;

import cl.torokoko.prestabanco.entity.Loan;
import cl.torokoko.prestabanco.entity.Status;
import cl.torokoko.prestabanco.repository.LoanRepository;
import cl.torokoko.prestabanco.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    public List<Status> getAll(){
        return statusRepository.findAll();
    }

}
