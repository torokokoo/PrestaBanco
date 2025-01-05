import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import employeeService from "../services/employee.service";
import loanTypeService from '@/services/loanType.service';
import { Divider, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Slider from '@mui/material/Slider';
import SaveIcon from "@mui/icons-material/Save";
import documentService from "../services/document.service";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Alert from "@mui/material/Alert";
import loanService from "../services/loan.service";
import { NumericFormat } from 'react-number-format';
import validator from 'validator';


export default function LoanRequest() {

    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [requestedLoanType, setRequestedLoanType] = useState(1);
    const [hasSelectedLoanType, setHasSelectedLoanType] = useState(false);
    const [requestedTerm, setRequestedTerm] = useState(0);
    const [requestedFunding, setRequestedFunding] = useState(0);
    const [requestedRating, setRequestedRating] = useState(0);
    const [avaluo, setAvaluo] = useState(0);
    const [loanTypes, setLoanTypes] = useState([[]]);
    const [requierements, setRequierements] = useState([{}]);
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])


    useEffect(() => {
        async function getAll() {
            const { data } = await loanTypeService.getAll().catch(() => setErrors(errors + 'Ha ocurrido un error consiguiendo los tipos de prestamo a traves de la API\n'))
            setLoanTypes(data)
        }

        getAll();

    }, [])

    useEffect(() => {
      const fetchAll = async function() {
        const { data } = await documentService.getAll().catch(() => setErrors(errors + 'Ha ocurrido un error consiguiendo los tipos de documentos a traves de la API\n'))
        setDocuments(data)
      }

      fetchAll();
    }, [])

    const loanTypeRequierements = {
      1: [documents[0], documents[1], documents[2], documents[7], documents[8]],
      2: [documents[0], documents[1], documents[2], documents[3], documents[7], documents[8]],
      3: [documents[0], documents[1], documents[4], documents[5], documents[7], documents[8]],
      4: [documents[0], documents[1], documents[6], documents[7], documents[9]],
    }

    useEffect(() => {
            setRequierements(loanTypeRequierements[requestedLoanType])
    }, [requestedLoanType])

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }

    }

    const validateEmail = (email) => {
      setEmail(email)
      const e = 'Debes ingresar un correo valido'
      if (!validator.isEmail(email)) {
        setErrors(errors.filter(i => i !== e).concat([e]))
      } else {
        setErrors(errors.filter(i => i !== e))
      }
    }

    const validateRut = (rutCompleto) => {
        const e = 'Debes ingresar un rut valido'
        setRut(rutCompleto)
    
        const dv = (T) => {
          var M=0,S=1;
          for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
          return S?S-1:'k';
        }

        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
          return false;
        var tmp 	= rutCompleto.split('-');
        var digv	= tmp[1]; 
        var rut 	= tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        if (dv(rut) == digv) {
          setErrors(errors.filter(i => i !== e))
        } else {
          setErrors(errors.filter(i => i !== e).concat([e]))
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
            loanType: requestedLoanType,
            status: 1,
            requestedTerm,
            requestedRate: requestedRating / 100,
            requestedFunding: requestedFunding / 100,
            birthdate: '2024-10-09T23:08:56+0000',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        const confirmText = `
        Quieres pedir un prestamo con los siguientes datos:
        RUT: ${loan.rut}
        EMAIL: ${loan.email}
        DIRECCION: ${loan.address}
        NOMBRE: ${loan.name}
        TIPO DE PRESTAMO: ${loanTypes[loan.loanType - 1].name}
        PERIODO: ${loan.requestedTerm} anos
        INTERESES: ${loan.requestedRate * 100}%
        `

        if (confirm(confirmText) == true) {
          const { data } = await loanService.create(loan).catch((e) => alert('Ha ocurrido un error generando la solicitud, intentelo nuevamente\n' + e));
          alert(`Se ha registrado tu solicitud con el numero de seguimiento ${data.loanId}`)
          navigate("/")
        }

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
          <Divider>SOLICITAR PRESTAMO</Divider>
          <form>
            <FormControl fullWidth>
              <TextField
                id="rut"
                label="Rut"
                value={rut}
                variant="standard"
                onChange={(e) => validateRut(e.target.value)}
                style={{ marginTop: "1rem" }}
                helperText="Ej. 12587698-8"
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
                onChange={(e) => validateEmail(e.target.value)}
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

            <Divider>DATOS DEL PRESTAMO</Divider>
            <FormControl fullWidth>
              <TextField
                id="loanType"
                label="Elige el tipo de prestamo"
                value={requestedLoanType}
                select
                variant="standard"
                defaultValue="Primera vivienda"
                style={{ marginTop: "1rem" }}
                onChange={
                  (e) => {
                    setRequestedLoanType(e.target.value)
                    setHasSelectedLoanType(true)
                  }
                }
                // style={{ width: "25%" }}
              >
                {loanTypes.map( (item, index) => {
                    return (<MenuItem key={index} value={index + 1}>{item.name}</MenuItem>)
                })}
              </TextField>
            </FormControl>

            <Box style={{marginTop: '50px', backgroundColor: '#F9F9F9', padding: '10px'}}>

            <h3>Elige el plazo en años</h3>
              <Slider 
                value={requestedTerm} 
                onChange={e => setRequestedTerm(e.target.value)} 
                defaultValue={0} 
                max={loanTypes[requestedLoanType - 1].maxTerm} 
                min={1}
                aria-label="Default" 
                valueLabelDisplay="auto"
                marks={[
                  {value: 1, label: '1 año'},
                  {value: loanTypes[requestedLoanType - 1].maxTerm, label: `${loanTypes[requestedLoanType - 1].maxTerm} años`}
                ]}
              />
            </Box>

            <Box style={{marginTop: '50px', backgroundColor: '#F9F9F9', padding: '10px'}}>

            <FormControl fullWidth>
                <NumericFormat
                    id="avaluo"
                    label="Cuanto es el avaluo de la propiedad"
                    value={avaluo}
                    customInput={TextField}
                    valueIsNumericString
                    // type="number"
                    defaultValue="0"
                    onChange={(e) => setAvaluo(e.target.value)}
                    thousandSeparator
                ></NumericFormat>
                
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
                (<Alert severity="error">{`El monto solicitado no puede ser superior al ${loanTypes[requestedLoanType - 1].maxFunding * 100}% del valor de la propiedad`}</Alert>) : (<></>)    
            }
                
            </FormControl>
            </Box>

            <Box style={{marginTop: '50px', backgroundColor: '#F9F9F9', padding: '10px'}}>
            <FormControl fullWidth>
                <TextField
                    id="requestedRating"
                    label="Elige el interes (en porciento)"
                    value={requestedRating}
                    type="number"
                    style={{ marginTop: "1rem" }}
                    // slotProps={{
                    //     input: {
                    //         endAdornment: <InputAdornment position="end">%</InputAdornment>
                    //     }
                    // }}
                    suffix="%"
                    onChange={(e) => setRequestedRating(e.target.value)}
                ></TextField>
                {loanTypes.length >= 1 && requestedRating >= (loanTypes[requestedLoanType - 1].maxRate * 100) ?
                (
                  <Alert severity="error">{`El porcentaje solicitado no puede ser superior al ${loanTypes[requestedLoanType - 1].maxRate * 100}%`}</Alert>
                ) : (<></>) }

                {loanTypes.length >= 1 && requestedRating <= (loanTypes[requestedLoanType - 1].minRate * 100) ?
                (
                  <Alert severity="error">{`El porcentaje solicitado no puede ser inferior al ${loanTypes[requestedLoanType - 1].minRate * 100}%`}</Alert>
                ) : (<></>) }
                
            </FormControl>
            </Box>

            {requestedFunding > 0 && requestedTerm > 0 && avaluo > 0 && requestedRating > 0 && 
            <h2>Estarias pagando una cuota mensual de {((avaluo * requestedFunding / 100) / (requestedTerm * 12) * (1 + requestedRating)).toFixed(2)}CLP, lo que da un total de {((avaluo * requestedFunding / 100) * (1 + requestedRating / 100)).toFixed(2)}CLP </h2>
            }
            <Divider>CARGA DE ARCHIVOS</Divider>
            <FormControl fullWidth>
              {/* Aqui simplemente hay que cambiar requierements.length > 1 por hasSelectedLoanType y se soluciona, entrega 3 */}
            {requierements.length > 1 && requierements.map((item, index) => {
                return (
                    <Button
                    component="label"
                    variant="outlined"
                    key={index}
                    startIcon={<UploadFileIcon />}
                    sx={{ marginRight: "1rem" }}
                    style={{ marginTop: "1rem" }}
                >
                    {item?.name}
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
                disabled={errors.length >= 1}
              >
                Solicitar
              </Button>
              {errors.length >= 1 && (<Alert severity="error">{errors.map(e => (<li key={e}>{e}</li>))}</Alert>)}
            </FormControl>
          </form>
          <hr />
        </Box>
      );
}
