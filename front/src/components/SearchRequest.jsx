import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import loanService from '../services/loan.service';

export default function SearchRequest() {
    const [_search, setSearch] = useState('');
    const [_open, setOpen] = useState(false);
    const [_loan, setLoan] = useState({})
    const navigate = useNavigate();

    const search = async () => {
        const { data } = await loanService.getById(_search)
        setLoan(data);
        setOpen(true);
        console.log(_loan)
    }
    return (
        <Container>
            <TextField 
                id="outlined-basic" 
                label="Ingresa el codigo de seguimiento" 
                variant="outlined" 
                fullWidth 
                style={{ "marginTop": "2em" }} 
                value={_search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button 
                variant="contained" 
                endIcon={<Search />} 
                style={{ "marginTop": "2em"}}
                onClick={(e) => search(e)}
            >
                Buscar
            </Button>
            <Dialog
        open={_open}
        onClose={() => setOpen(!_open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Estado de la solicitud numero ${_search}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>La solicitud se encuentra en el estado {_loan.status.name}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={() => setOpen(false)} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog> 
        </Container>

    )
}