import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import loanService from '../services/loan.service';
import statusService from '../services/status.service';
import loanTypeService from '../services/loanType.service';
import { Navigate, useNavigate } from 'react-router-dom';

function RenderButton(props) {
    const { id } = props;
    const navigate = useNavigate();

    const openLoan = () => {
        navigate(`/executive/review/${id}`)
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
        REVISAR
      </Button>
    )
}


export default function DataGridDemo() {
    const columns = [
      {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: false,
      },
      {
        field: 'rut',
        headerName: 'RUT',
        width: 150,
        editable: false,
      },
      // TODO: valueFormatter con switch para ir iterando el estado (ENTREGA 3)
      {
        field: 'loanType',
        headerName: 'Tipo de prestamo',
        width: 220,
        editable: true,
        // valueGetter: (params) => params.name
        valueFormatter: (params) => { return loanType[params - 1]?.name }
      },
      {
        field: 'status',
        headerName: 'Estado',
        width: 220,
        // valueGetter: (params) => params.name
        valueFormatter: (params) => { return status[params - 1]?.name }
      },
      {
        field: 'updatedAt',
        headerName: 'Ultima actualizacion',
        width: 160,
        valueFormatter: (params) => {
            const date = new Date(params)
            return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${date.getHours()}hrs`
        }
      },
      {
        field: 'loanId',
        headerName: 'Revisar',
        width: 150,
        renderCell: RenderButton,
      },
    ];

    const [loans, setLoans] = useState([])
    const [status, setStatus] = useState([])
    const [loanType, setLoanType] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAll = async function() {
            const { data } = await loanService.getAll().catch((e) => alert('Ha ocurrido un error conectandose a la API\n' + e))
            setLoans(data)
            setLoading(false)

            data.length == 0 ? alert('No hay ningun prestamo solicitado') : ''
        }

        fetchAll();
    }, [])

    useEffect(() => {
      const fetch = async function() {
        const { data } = await loanTypeService.getAll()
        setLoanType(data)
      }

      fetch();
    }, [])

    useEffect(() => {
      const fetch = async function() {
        const { data } = await statusService.getAll()
        setStatus(data)
      }
      
      fetch();
    }, [])


  return (
    <Box sx={{ height: 600, width: '100%' }}>
      { loading ? 
        (<CircularProgress style={{ marginTop: "2rem"}}/>) :
        (
          <DataGrid
          rows={loans}
          columns={columns}
          getRowId={(row) => row.loanId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          disableRowSelectionOnClick
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
        )
      }
    </Box>
  );
}