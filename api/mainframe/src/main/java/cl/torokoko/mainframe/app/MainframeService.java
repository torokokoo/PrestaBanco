package cl.torokoko.mainframe.app;

import org.springframework.stereotype.Service;
import java.lang.Math;

@Service
public class MainframeService {
    public double simulate(int P, double r, int n) {
        double dividend = (r * Math.pow((1 + r), n));
        double divisor = (Math.pow((1 + r), n) - 1);

        return (P * (dividend / divisor));
    }
}
