import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/base';
import { getVacations } from '../api/VacationApi';

function createData(name, org, startDate, endDate ) {
  return { name, org, startDate, endDate  };
}

export default function BasicTable() {
    const [memberId, setMemberId] = useState('');
    const [vacationId, setVacationId] = useState('');
    const [vacations, setVacations] = useState([]);

    const vacationRows = vacations.map((vacation) => {
        const startDate = new Date(vacation.vacationDuration.startDateTime).toISOString().split('T')[0];
        const endDate = new Date(vacation.vacationDuration.endDateTime).toISOString().split('T')[0];
        
        return <TableRow key={vacation.vacationId}>
                    <TableCell>{vacation.requesterName}</TableCell>
                    <TableCell>{startDate}</TableCell>
                    <TableCell>{endDate}</TableCell>
                </TableRow>
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const findVacations = await getVacations(memberId);
            setVacations(findVacations);
        } catch (err) {
            console.error(err);
        }
    }


  return (
    <div>
            <form onSubmit={handleSubmit}>
                    <div>
                        <TextField 
                            id="outlined-user" 
                            label="사용자ID" 
                            variant="outlined" 
                            size="small"
                            margin="dense"
                            value={memberId} onChange={(e) => setMemberId(e.target.value)}/>
                    </div>
                    <div>
                    <TextField 
                        id="outlined-vac" 
                        label="휴가ID" 
                        variant="outlined" 
                        size="small"
                        margin="dense"
                        value={vacationId} onChange={(e) => setVacationId(e.target.value)} /> 
                    </div>
                    <Button type="submit">검색</Button>
            </form>

        
        <TableContainer sx={{maxWidth: 360, margin: "0 auto"}} component={Paper}>
        <Table sx={{ maxWidth: 360 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell >성함</TableCell>
                <TableCell align="right">시작일</TableCell>
                <TableCell align="right">종료일</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                 {vacationRows}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}