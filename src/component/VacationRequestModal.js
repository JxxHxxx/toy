import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export const VacationRequestModal = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  // 제출 API 추가해야함
  const hanleSubmit = () => {
    setOpen(false);
  }

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>휴가 유형...(유급, 경조)</h2>
          </div>
          <VacationCategorySelect></VacationCategorySelect>

          <VacationTypeRadioGroup></VacationTypeRadioGroup>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>


          <Button onClick={hanleSubmit} sx={{ position: 'absolute', bottom: 10, right: 10 }}>작성 완료</Button>

          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon onClick={handleClose} />
          </IconButton>
          <div>
            <h2>결재선 라인 어케 정할지!!</h2>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export const VacationTypeRadioGroup = () => {
  const [vacationType, setVacationType] = useState('Annual');

  const handleAnnual = () => {
    setVacationType('Annual')
  }

  const handleHalf = () => {
    setVacationType('Half')
  }

  const handleQuarter = () => {
    setVacationType('Quarter')
  }

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">휴가 유형</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel onClick={handleAnnual} value="female" control={<Radio />} label="연차" />
        <FormControlLabel onClick={handleHalf} value="male" control={<Radio />} label="반차" />
        <FormControlLabel onClick={handleQuarter} value="other" control={<Radio />} label="반반차" />
      </RadioGroup>
      <div>
        {vacationType === 'Annual' && <VacationDuration></VacationDuration>}
        {vacationType === 'Half' && <VacationDate label='half Date'></VacationDate>}
        {vacationType === 'Quarter' && <VacationDate label='Quarter Date'></VacationDate>}
      </div>
    </FormControl>
  );
}

export const VacationDuration = () => {
  const [value, setValue] = useState(dayjs('2024-03-01'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="Start Date" defaultValue={dayjs('2024-03-01')} />
        <DatePicker
          label="End Date"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export const VacationDate = (props) => {
  const [value, setValue] = useState(dayjs('2024-03-01 09:00'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker
          label={props.label}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
export const VacationCategorySelect = () => {
  const [vacationCategory, setVacationCategory] = useState('basic');

  const handleChange = (event) => {
    setVacationCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">휴가 유형</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vacationCategory}
          label="휴가 유형"
          onChange={handleChange}
        >
          <MenuItem value={'basic'}>일반 휴가 </MenuItem>
          <MenuItem value={'cc'}>경조사 휴가</MenuItem>
          <MenuItem value={'etc'}>그 외 휴가</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}