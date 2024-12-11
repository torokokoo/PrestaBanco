package cl.torokoko.mainframe.app;

import cl.torokoko.mainframe.requests.SimulatedCredit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mainframe")
@CrossOrigin("*")
public class MainframeController {

    @Autowired
    MainframeService mainframeService;

    @PostMapping("/simulate")
    public double simulate(@RequestBody SimulatedCredit credit){
        int P = credit.getMontoPrestamo();
        double r = credit.getTasaInteresMensual();
        int n = credit.getMontoPrestamo();
        System.out.println("Se ha solicitado un credito:");
        System.out.println(credit);

        return mainframeService.simulate(P, r, n);
    };

}
