import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(vacationId, calories, fat, carbs, protein) {
  return { vacationId, calories, fat, carbs, protein };
}

const rows = [
  createData(12,'2024-03-16', '2024-03-18', '유급 연차', 4),
  createData(13,'2024-04-09', '2024-04-09', '공동 연차', 15),
  createData(14,'2024-04-29', '2024-04-29', '오전 반차', 29)
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">시작일</TableCell>
            <TableCell align="left">종료일</TableCell>
            <TableCell align="left">연차 종류</TableCell>
            <TableCell align="left">d-day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.vacationId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}