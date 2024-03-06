import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const VacationRequestModal = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            휴가 신청
          </Typography>
          <VacationTypeRadioGroup></VacationTypeRadioGroup>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>준비중</div>
            <div>준비중</div>
            <div>준비중</div>
          </Typography>


          <Button sx={{ position: 'absolute', bottom: 10, right: 10 }}>작성 완료</Button>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon onClick={handleClose} />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
}

export const VacationTypeRadioGroup = () => {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">휴가 유형</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="연차" />
        <FormControlLabel value="male" control={<Radio />} label="반차" />
        <FormControlLabel value="other" control={<Radio />} label="반반차" />
      </RadioGroup>
    </FormControl>
  );
}