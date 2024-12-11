import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SaveIcon from "@mui/icons-material/Save";
import { Checkbox, FormControl, TextField, Divider, MenuItem, Container } from '@mui/material';
import loanService from '../services/loan.service';
import documentService from '../services/document.service';
import loanTypeRequierementsService from '../services/loanTypeRequierements.service';
import { useParams } from 'react-router-dom';
import statusService from '../services/status.service';
import { useNavigate } from 'react-router-dom';

function RenderReviewButton(props) {
    const { id } = props;
    // const navigate = useNavigate();

    const openLoan = () => {
        // navigate(`/executive/review/${id}`)
    }

    return (
        <Button
        // ref={buttonElement}
        // touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={openLoan}
        // Remove button from tab sequence when cell does not have focus
        onKeyDown={(event) => {
          if (event.key === ' ') {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
      >
        Revisar
      </Button>
    )
}

function EdadSolicitante(props) {
    const { cuotas } = props;
    const [edad, setEdad] = useState(0);

    // Hay que pasarlo a backend
    let valid = (parseInt(edad) + parseInt(cuotas)) <= 70

    return (

    <TableRow
    key={'Edad del solicitante'}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
        Edad del solicitante
        </TableCell>
        <TableCell align="right"><RenderReviewButton/></TableCell>
        <TableCell align="right">
            <FormControl>
            <TextField
                id="balance"
                label="Valor"
                type="number"
                value={edad}
                variant="standard"
                style={{ marginTop: "1rem" }}
                onChange={(e) => setEdad(e.target.value)}
            />
        </FormControl> 
      </TableCell>
      <TableCell>{ valid ? '' : 'La edad del solicitante es demasiado para la cantidad de cuotas' }</TableCell>
      </TableRow>
    )
}

function ComprobanteIngresos(props) {
    const { avaluo, requestedFunding, requestedTerm } = props;
    const [_ingresos, setIngresos] = useState(0);

    // Hay que pasarlo a backend
    const cuotaMensual = (requestedFunding * avaluo) / (requestedTerm * 12)
    const ingresosSuficientes = (cuotaMensual / _ingresos * 100) > 35 ? 'No tiene ingresos suficientes' : 'Aprobado'

    return (

    <TableRow
    key={'Comprobante de Ingresos'}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
        Comprobante de Ingresos
        </TableCell>
        <TableCell align="right"><RenderReviewButton/></TableCell>
        <TableCell align="right">
            <FormControl>
            <TextField
                id="balance"
                label="Valor"
                type="number"
                value={_ingresos}
                variant="standard"
                style={{ marginTop: "1rem" }}
                onChange={(e) => setIngresos(e.target.value)}
            />
        </FormControl> 
      </TableCell>
      <TableCell>{ avaluo > 0 ? ingresosSuficientes : 'No se ha ingresado el avaluo fiscal' }</TableCell>
      </TableRow>
    )
}

function HistorialCrediticio() {
    const [_historialCrediticio, setHistorialCrediticio] = useState(false);

    return (

        <TableRow
        key={'Historial crediticio'}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
            Historial crediticio
            </TableCell>
            <TableCell align="right"><RenderReviewButton/></TableCell>
            <TableCell align="right">
            <FormControl>
                <Checkbox checked={_historialCrediticio} onChange={(e) => setHistorialCrediticio(e.target.checked)}></Checkbox>
            </FormControl> 
          </TableCell>
          {/* <TableCell>{ avaluo > 0 ? ingresosSuficientes : 'No se ha ingresado el avaluo fiscal' }</TableCell> */}
          </TableRow>
        )
}

function CapacidadAhorro() {
    const [_saldoMinimo, setSaldoMinimo] = useState(false);
    const [_historialConsistente, setHistorialConsistente] = useState(false)
    const [_depositosPeriodicos, setDepositosPeriodicos] = useState(false)
    const [_relacionSaldoAntiguedad, setRelacionSaldoAntiguedad] = useState(false)
    const [_retirosRecientes, setRetirosRecientes] = useState(false)

    return (

        <TableRow
        key={'Escritura de la primera vivienda'}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
            Escritura de la primera vivienda
            </TableCell>
            <TableCell align="right"><RenderReviewButton/></TableCell>
            <TableCell align="center">
            <FormControl>
                <span>Saldo minimo</span>
                <Checkbox checked={_saldoMinimo} onChange={(e) => setSaldoMinimo(e.target.checked)}>Saldo minimo</Checkbox>
                <br />
                <span>Historial consistente</span>
                <Checkbox checked={_historialConsistente} onChange={(e) => setHistorialConsistente(e.target.checked)}></Checkbox>
                <span>Depositos Periodicos</span>
                <Checkbox checked={_depositosPeriodicos} onChange={(e) => setDepositosPeriodicos(e.target.checked)}></Checkbox>
                <span>Relacion Saldo/Anos de antiguedad</span>
                <Checkbox checked={_relacionSaldoAntiguedad} onChange={(e) => setRelacionSaldoAntiguedad(e.target.checked)}></Checkbox>
                <span>Retiros recientes</span>
                <Checkbox checked={_retirosRecientes} onChange={(e) => setRetirosRecientes(e.target.checked)}></Checkbox>
            </FormControl> 
          </TableCell>
          </TableRow>
        )
}

function EscrituraPrimeraVivienda() {
    const [_, set] = useState(false);

    return (

        <TableRow
        key={'Escritura de la primera vivienda'}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
            Escritura de la primera vivienda
            </TableCell>
            <TableCell align="right"><RenderReviewButton/></TableCell>
            <TableCell align="right">
            <FormControl>
                <Checkbox checked={_} onChange={(e) => set(e.target.checked)}></Checkbox>
            </FormControl> 
          </TableCell>
          </TableRow>
        )
}

function RelacionDeudaIngreso() {
    const [_, set] = useState(false);

    return (

        <TableRow
        key={'Relacion deuda/ingreso'}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
            Relacion deuda/ingreso
            </TableCell>
            <TableCell align="right"><RenderReviewButton/></TableCell>
            <TableCell align="right">
            <FormControl>
                <Checkbox checked={_} onChange={(e) => set(e.target.checked)}></Checkbox>
            </FormControl> 
          </TableCell>
          </TableRow>
        )
}

function CertificadoAvaluo(props) {
    const { _avaluo, setAvaluo } = props;
    // const [, setIngresos] = useState(0);

    return (

    <TableRow
    key={'Certificado de Avaluo'}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
        Certificado de Avaluo
        </TableCell>
        <TableCell align="right"><RenderReviewButton/></TableCell>
        <TableCell align="right">
            <FormControl>
            <TextField
                id="balance"
                label="Valor"
                type="number"
                value={_avaluo}
                variant="standard"
                style={{ marginTop: "1rem" }}
                onChange={(e) => setAvaluo(e.target.value)}
            />
        </FormControl> 
      </TableCell>
      </TableRow>
    )
}

function AntiguedadLaboral(props) {
    const { _antiguedad, setAntiguedad } = props;

    return (

    <TableRow
    key={'Certificado de antiguedad laboral'}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
          Certificado de antiguedad laboral
        </TableCell>
        <TableCell align="right"><RenderReviewButton/></TableCell>
        <TableCell align="right">
            <FormControl>
            <TextField
                id="antiguedad"
                label="Antiguedad en anos"
                type="number"
                value={_antiguedad}
                variant="standard"
                style={{ marginTop: "1rem" }}
                onChange={(e) => setAntiguedad(e.target.value)}
            />
        </FormControl> 
      </TableCell>
      <TableCell>{ _antiguedad > 1 ? '': 'No cumple con la antiguedad minima de 1 ano' }</TableCell>
      </TableRow>
    )
}

export default function ReviewLoan() {

    const { id } = useParams();
    const [loan, setLoan] = useState({});
    const [loadedLoan, setLoadedLoan] = useState(false);
    const [requierements, setRequierements] = useState([{}]);
    const [calculate, setCalculate] = useState([]);
    const [documents, setDocuments] = useState([])
    const [status, setStatus] = useState([]);
    const [newStatus, setNewStatus] = useState([]);
    const navigate = useNavigate();

    const [_avaluo, setAvaluo] = useState(0);
    const [_antiguedad, setAntiguedad] = useState(0);


    useEffect(() => {
        const fetchLoan = async () => {
            const { data } = await loanService.getById(id)
            setLoan(data);
            setLoadedLoan(true)
        }

        fetchLoan();
    }, [])

    useEffect(() => {
        const fetchStatus = async () => {
            const { data } = await statusService.getAll()
            setStatus(data);
        }

        fetchStatus();
    }, [])

    useEffect(() => {
        async function getRequierements() {

            const loanTypeRequierements = {
              1: [documents[0], documents[1], documents[2], documents[7], documents[8]],
              2: [documents[0], documents[1], documents[2], documents[3], documents[7], documents[8]],
              3: [documents[0], documents[1], documents[4], documents[5], documents[7], documents[8]],
              4: [documents[0], documents[1], documents[6], documents[7], documents[9]],
            }

            if (loadedLoan) {
                setRequierements(loanTypeRequierements[loan.loanType])
            } 
        }

        getRequierements();
    }, [loadedLoan])

    useEffect(() => {
      const fetchAll = async function() {
        const { data } = await documentService.getAll()
        setDocuments(data)
        // documents.map( d => console.log(d) )
      }

      fetchAll();
    }, [])


    const updateLoan = async (e) => {
        e.preventDefault();

        const payload = {
            loanId: loan.loanId
        }

        await loanService.updateStatus(payload, newStatus);
        alert('Solicitud actualizada')
        navigate('/');
    }


  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Solicitante: {loan.name}</TableCell>
            { loan.loanType?.name && <TableCell align="right">Tipo de prestamo: {loan.loanType.name}</TableCell>}
            <TableCell>Estado de la solicitud: {loan.status?.name}</TableCell>
            <TableCell>Financiemiento solicitado: {loan.requestedFunding * 100}% </TableCell>
            <TableCell>Tiempo del credito: {loan.requestedTerm} anos </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { requierements.length > 0 && requierements.map((row, index) => {
            if (row.name == 'Comprobante de Ingresos') {
                return <ComprobanteIngresos key={index} avaluo={_avaluo} requestedFunding={loan.requestedFunding} requestedTerm={loan.requestedTerm}/>
            }
            if (row.name == 'Certificado de avaluo') {
                return <CertificadoAvaluo key={index} _avaluo={_avaluo} setAvaluo={setAvaluo}/>
            }
            if (row.name == 'Historial crediticio') {
                return <HistorialCrediticio key={index} />
            }
            if (row.name == "Certificado de antiguedad laboral") {
                return <AntiguedadLaboral key={index} _antiguedad={_antiguedad} setAntiguedad={setAntiguedad} />
            }
            if (row.name == "Escritura de la primera vivienda") {
                return <EscrituraPrimeraVivienda key={index} _antiguedad={_antiguedad} setAntiguedad={setAntiguedad} />
            }
            // return null;
          })}
          <RelacionDeudaIngreso />
          <EdadSolicitante cuotas={loan.requestedTerm} />
          <CapacidadAhorro />
        </TableBody>
      </Table>
    </TableContainer>
            
            {/* <Divider>ACTUALIZAR ESTADO</Divider> */}
            <FormControl fullWidth>
              <TextField
                id="loanType"
                label="Elige el nuevo estado"
                value={newStatus}
                select
                variant="standard"
                defaultValue="Primera vivienda"
                style={{ marginTop: "1rem", width: "25%" }}
                onChange={(e) => setNewStatus(e.target.value)}
                // style={{ width: "25%" }}
              >
                {status.map( (item, index) => {
                    return (<MenuItem key={index} value={index + 1}>{item.name}</MenuItem>)
                })}
              </TextField>
            </FormControl>
            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => updateLoan(e)}
                style={{ marginTop: "1rem" }}
                startIcon={<SaveIcon />}
              >
                ACTUALIZAR
              </Button>
            </FormControl>
    </>
  );
}