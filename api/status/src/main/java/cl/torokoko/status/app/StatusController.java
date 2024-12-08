package cl.torokoko.status.app;

import cl.torokoko.status.app.StatusService;
import cl.torokoko.status.app.Status;
import cl.torokoko.status.app.StatusRepository;
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

    @GetMapping("/{id}")
    public Status getLoan(@PathVariable long id) { return statusService.getById(id); }
}
