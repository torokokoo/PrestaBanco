package cl.torokoko.status.app;

import cl.torokoko.status.app.Status;
import cl.torokoko.status.app.StatusRepository;
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
