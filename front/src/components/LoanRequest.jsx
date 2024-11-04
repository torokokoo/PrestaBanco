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


export default function LoanRequest() {

    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [requestedLoanType, setRequestedLoanType] = useState(1);
    const [requestedTerm, setRequestedTerm] = useState(0);
    const [requestedFunding, setRequestedFunding] = useState(0);
    const [loanTypes, setLoanTypes] = useState([[]]);
    const [requierements, setRequierements] = useState([{}]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAll() {
            const { data } = await loanTypeService.getAll()
            setLoanTypes(data)
        }

        getAll();

    }, [])

    useEffect(() => {
        async function getRequierements() {
            const { data } = await loanTypeRequierementsService.getRequierements(requestedLoanType)
            setRequierements(data)
        }

        getRequierements();
    }, [requestedLoanType])

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }

    }

    const requestLoan = async (e) => {
        e.preventDefault();

        const loan = {
            rut, 
            email,
            address,
            balance,
            name, 
            loanType: {
                loanTypeId: requestedLoanType
            },
            status: {
                statusId: 1
            },
            requestedTerm,
            requestedFunding: requestedFunding / 100,
            birthdate: '2024-10-09T23:08:56+0000',
            createdAt: Date.now(),
            updatedAt: Date.now(),

        }

        const { data } = await loanService.create(loan);
        alert(`Se ha registrado tu solicitud con el numero de seguimiento ${data.loanId}`)
        navigate("/")
    }

    // useEffect(() => console.log(requestedLoanType), [requestedLoanType])


    return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          component="form"
          style={{"margin": "50px"}}
        >
          <Divider>DATOS PERSONALES</Divider>
          <form>
            <FormControl fullWidth>
              <TextField
                id="rut"
                label="Rut"
                value={rut}
                variant="standard"
                onChange={(e) => setRut(e.target.value)}
                style={{ marginTop: "1rem" }}
                helperText="Ej. 12.587.698-8"
              />
            </FormControl>
    
            <FormControl fullWidth>
              <TextField
                id="name"
                label="Name"
                value={name}
                style={{ marginTop: "1rem" }}
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id="email"
                label="Email"
                value={email}
                style={{ marginTop: "1rem" }}
                variant="standard"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id="address"
                label="Direccion"
                value={address}
                style={{ marginTop: "1rem" }}
                variant="standard"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
    
            <FormControl fullWidth>
              <TextField
                id="balance"
                label="Saldo"
                type="number"
                value={balance}
                variant="standard"
                style={{ marginTop: "1rem" }}
                onChange={(e) => setBalance(e.target.value)}
                helperText="Saldo bancario en Pesos Chilenos"
              />
            </FormControl>

            <Divider>PRESTAMO</Divider>
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
                    defaultValue="0"
                    style={{ marginTop: "1rem" }}
                    onChange={(e) => setRequestedTerm(e.target.value)}
                ></TextField>
                {loanTypes.length >= 1 && requestedTerm > loanTypes[requestedLoanType - 1].maxTerm ?
                (<>Has superado el plazo maximo</>) : (<></>)    
            }
                
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    id="requestedFunding"
                    label="Elige el financiamiento (en porciento)"
                    value={requestedFunding}
                    type="number"
                    defaultValue="0"
                    style={{ marginTop: "1rem" }}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">%</InputAdornment>
                        }
                    }}
                    onChange={(e) => setRequestedFunding(e.target.value)}
                ></TextField>
                {loanTypes.length >= 1 && requestedFunding > (loanTypes[requestedLoanType - 1].maxFunding * 100) ?
                (<>Has superado el financimiento maximo</>) : (<></>)    
            }
                
            </FormControl>

            <Divider>CARGA DE ARCHIVOS</Divider>
            <FormControl fullWidth>
            {requierements.map((item, index) => {
                return (
                    <Button
                    component="label"
                    variant="outlined"
                    key={index}
                    startIcon={<UploadFileIcon />}
                    sx={{ marginRight: "1rem" }}
                    style={{ marginTop: "1rem" }}
                >
                    {item.name}
                    <input type="file" accept=".pdf" hidden onChange={handleFileUpload} />
                </Button> 
                )
            })}
            </FormControl>
    
            <FormControl>
              <br />
              <Button
                variant="contained"
                color="info"
                onClick={(e) => requestLoan(e)}
                style={{ marginTop: "1rem" }}
                startIcon={<SaveIcon />}
              >
                Solicitar
              </Button>
            </FormControl>
          </form>
          <hr />
        </Box>
      );
}
