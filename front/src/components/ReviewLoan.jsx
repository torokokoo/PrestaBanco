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

export default function ReviewLoan() {

    const { id } = useParams();
    const [loan, setLoan] = useState({});
    const [loadedLoan, setLoadedLoan] = useState(false);
    const [requierements, setRequierements] = useState([{}]);
    const [calculate, setCalculate] = useState([]);
    const [status, setStatus] = useState([]);
    const [newStatus, setNewStatus] = useState([]);
    const navigate = useNavigate();

    const [_avaluo, setAvaluo] = useState(0);


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
            console.log(loadedLoan, loan)
            if (loadedLoan) {
                const { data } = await loanTypeRequierementsService.getRequierements(loan.loanType?.loanTypeId)
                setRequierements(data)
            } 
            console.log(requierements)
        }

        getRequierements();
    }, [loadedLoan])

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
          { requierements.map((row, index) => {
            if (row.name == 'Comprobante de Ingresos') {
                return <ComprobanteIngresos key={index} avaluo={_avaluo} requestedFunding={loan.requestedFunding} requestedTerm={loan.requestedTerm}/>
            }
            if (row.name == 'Certificado de avaluo') {
                return <CertificadoAvaluo key={index} _avaluo={_avaluo} setAvaluo={setAvaluo}/>
            }
            if (row.name == 'Historial crediticio') {
                return <HistorialCrediticio key={index} />
            }
            return null;
          })}
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