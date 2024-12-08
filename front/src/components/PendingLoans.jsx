import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import loanService from '../services/loan.service';
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
        Open
      </Button>
    )
}

const columns = [
//   { field: 'loanId', headerName: 'ID', width: 90 },
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
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 220,
    // valueGetter: (params) => params.name
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

export default function DataGridDemo() {

    const [loans, setLoans] = useState([])

    useEffect(() => {
        const fetchAll = async function() {
            const { data } = await loanService.getAll()
            setLoans(data)
        }

        fetchAll();
    }, [])

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={loans}
        columns={columns}
        getRowId={(row) => row.loanId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}