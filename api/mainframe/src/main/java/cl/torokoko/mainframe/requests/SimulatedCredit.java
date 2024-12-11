package cl.torokoko.mainframe.requests;

import lombok.Data;

@Data
public class SimulatedCredit {
    private int montoPrestamo; // P
    private double tasaInteresMensual; // r
    private int numeroTotalPagos; // n
}
