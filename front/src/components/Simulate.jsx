import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import employeeService from "../services/employee.service";
import loanTypeService from '@/services/loanType.service';
import { Divider, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Slider from '@mui/material/Slider';
import SaveIcon from "@mui/icons-material/Save";
import loanTypeRequierementsService from "../services/loanTypeRequierements.service";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import loanService from "../services/loan.service";
import mainframeService from '../services/mainframe.service';


export default function LoanRequest() {

    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [requestedLoanType, setRequestedLoanType] = useState(1);
    const [requestedTerm, setRequestedTerm] = useState(0);
    const [requestedFunding, setRequestedFunding] = useState(0);
    const [requestedRating, setRequestedRating] = useState(0);
    const [avaluo, setAvaluo] = useState(0);
    const [loanTypes, setLoanTypes] = useState([[]]);
    const [results, setResults] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAll() {
            const { data } = await loanTypeService.getAll()
            setLoanTypes(data)
        }

        getAll();

    }, [])

    const fetchSimulation = async (n, p, r) => {
        let payload = {
            montoPrestamo: p,
            tasaInteresMensual: r / 12 / 100, // r = tasa anual en porciento,
            numeroTotalPagos: n * 12 // n = cantidad de anos
        }

        setResults(await mainframeService.simulate(payload))
        console.log(results)
    }


    return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
          style={{"margin": "50px"}}
        >
          <Divider>SIMULADOR DE PRESTAMOS</Divider>
          <form>
            <FormControl fullWidth>
              <TextField
                id="loanType"
                label="Elige el tipo de prestamo"
                value={requestedLoanType}
                select
                variant="standard"
                defaultValue="Primera vivienda"
                style={{ marginTop: "1rem" }}
                onChange={(e) => setRequestedLoanType(e.target.value)}
                // style={{ width: "25%" }}
              >
                {loanTypes.map( (item, index) => {
                    return (<MenuItem key={index} value={index + 1}>{item.name}</MenuItem>)
                })}
              </TextField>
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="requestedTerm"
                    label="Elige el plazo en anos"
                    value={requestedTerm}
                    type="number"
                    style={{ marginTop: "1rem" }}
                    onChange={(e) => setRequestedTerm(e.target.value)}
                ></TextField>
                {loanTypes.length >= 1 && requestedTerm > loanTypes[requestedLoanType - 1].maxTerm ?
                (<>Has superado el plazo maximo</>) : (<></>)    
            }
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="avaluo"
                    label="Cuanto es el monto que quieres solicitar"
                    value={avaluo}
                    type="number"
                    style={{ marginTop: "1rem" }}
                    onChange={(e) => setAvaluo(e.target.value)}
                ></TextField>
                
            </FormControl>


            <FormControl fullWidth>
                <TextField
                    id="requestedRating"
                    label="Elige la tasa de interes anual (en porciento)"
                    value={requestedRating}
                    type="number"
                    style={{ marginTop: "1rem" }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }
                    }}
                    onChange={(e) => setRequestedRating(e.target.value)}
                ></TextField>
                {loanTypes.length >= 1 && requestedRating > (loanTypes[requestedLoanType - 1].maxRate * 100) ?
                (<>Has superado el interes maximo permitido</>) : (<></>) }

                {loanTypes.length >= 1 && requestedRating != 0 && requestedRating < (loanTypes[requestedLoanType - 1].minRate * 100) ?
                (<>Estas por debajo del interes minimo permitido</>) : (<></>) }
                
            </FormControl>

            <br />
            <Button
                variant="contained"
                color="info"
                onClick={() => fetchSimulation(requestedTerm, avaluo, requestedRating)}
                style={{ marginTop: "2rem", marginRight: "50px"}}
                startIcon={<SaveIcon />}
            >
                Calcular
            </Button>

            {results && 
                <h2>Estarias pagando una cuota mensual de CLP{results.data}</h2>
            }
            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate('/loan/request')}
                style={{ marginTop: "1rem" }}
                startIcon={<SaveIcon />}
              >
                Me interesa
              </Button>
            </FormControl>
          </form>
          <hr />
        </Box>
      );
}
