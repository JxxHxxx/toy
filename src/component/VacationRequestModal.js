import { Fragment, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
import 'dayjs/locale/ko';
import SearchIcon from '@mui/icons-material/Search';
import { postUserAuthentication } from '../api/LoginApi';
import { findDepartmentMembers } from '../api/MemberApi';
import { postCreateVacation } from '../api/VacationApi';
import { enrollApprovalLines, raiseConfirmDucument } from '../api/ConfirmApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export const VacationRequestModal = () => {
  const [open, setOpen] = useState(true);
  const [vacationForm, setVacationForm] = useState({
    requesterId: sessionStorage.getItem('memberId'),
    vacationDuration: {
      vacationType: 'MORE_DAY',
      startDateTime: dayjs().add(9, 'hour'),
      endDateTime: dayjs().add(9, 'hour')
    }
  });
  const [createdVacation, setCreatedVacation] = useState();

  const [approvalLineOpen, setApprovalLineOpen] = useState(false)

  const handleVacationRequestModalOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const hanleSubmit = async () => {
    // BACKEND API 호출
    const createVacationResponse = await postCreateVacation(vacationForm);
    setCreatedVacation(createVacationResponse);
    setApprovalLineOpen(true);
    setOpen(false);
  };

  // useEffect(() => {
  //   postUserAuthentication();
  // }, []);

  useEffect(() => {
    const fetchUserAuthentication = async () => {
      try {
        await postUserAuthentication();
      } catch (error) {
        if (error.response && error.response.status !== 200) {
          // 에러 응답이 있고 상태 코드가 200이 아닌 경우 경고창을 띄웁니다.
          alert('사용자 인증에 실패했습니다. 다시 시도해주세요.');
        } else {
          // 네트워크 오류 등의 경우에도 경고창을 띄웁니다.
          alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };
  
    fetchUserAuthentication();
  }, []);

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
          <VacationCategorySelect vf={{ vacationForm, setVacationForm }}></VacationCategorySelect>

          <VacationTypeRadioGroup></VacationTypeRadioGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Start Date"
                value={vacationForm.vacationDuration.startDateTime}
                onChange={(startDate) => setVacationForm((prev) => ({
                  ...prev,
                  vacationDuration: {
                    ...prev.vacationDuration,
                    startDateTime: startDate
                  },
                }))}

              />
              <DatePicker
                label="End Date"
                value={vacationForm.vacationDuration.endDateTime}
                onChange={(endDate) => setVacationForm((prev) => ({
                  ...prev,
                  vacationDuration: {
                    ...prev.vacationDuration,
                    endDateTime: endDate
                  },
                }))}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Button onClick={hanleSubmit} sx={{ position: 'absolute', bottom: 10, right: 10 }}>다음</Button>

          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon onClick={handleClose} />
          </IconButton>
        </Box>
      </Modal>
      <ApprovalLineModal vacation={ createdVacation } open={{ approvalLineOpen, setApprovalLineOpen, handleVacationRequestModalOpen }} />
    </div>
  );
}

export const VacationCategorySelect = (props) => {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">휴가 유형</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.vf.vacationForm.vacationDuration.vacationType}
          label="휴가 유형"
          onChange={(event) => {
            const selectedValue = event.target.value;

            props.vf.setVacationForm((prev) => ({
              ...prev,
              vacationDuration: {
                ...prev.vacationDuration,
                vacationType: selectedValue
              },
            }));
          }}
        >
          <MenuItem value='MORE_DAY'>일반 휴가 </MenuItem>
          <MenuItem value='SPEC'>경조사 휴가</MenuItem>
          <MenuItem value='ETC'>그 외 휴가</MenuItem>
        </Select>
      </FormControl>
    </Box>
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
    </FormControl>
  );
}

export const ApprovalLineModal = (props) => {
  const { approvalLineOpen, setApprovalLineOpen } = props.open;
  const handleVacationRequestModalOpen = props.open.handleVacationRequestModalOpen;
  
  const [approvalLine, setApprovalLine] = useState([]);

  const callbackApprovalLine = (newApprovalLine) => {
    setApprovalLine(newApprovalLine)
  };

  const handleConfirmDocumentRaise = async () => {
    // 제출 로직
    const confirmDocumentType = 'VAC'
    const companyId = sessionStorage.getItem('companyId');
    const vacationId = props.vacation.vacationId;
    const confirmDocumentId = confirmDocumentType + companyId + vacationId;

    await enrollApprovalLines(confirmDocumentId, approvalLine);
    await raiseConfirmDucument(confirmDocumentId, {
      companyId : sessionStorage.getItem('companyId'),
      departmentId : sessionStorage.getItem('departmentId'),
      requesterId : sessionStorage.getItem('memberId')
    })

    setApprovalLineOpen(false);
  };

  const handleClose = () => {
    setApprovalLineOpen(false);
  };

  const handleTest = () => {
    setApprovalLineOpen(false);
    handleVacationRequestModalOpen();
  }

  return (
    <Fragment>
      <Modal
        open={approvalLineOpen}
        // onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <h2 id="child-modal-title">결재선 지정</h2>
          <MemberSearchInput callbackApprovalLine={callbackApprovalLine}/>
          <Button onClick={handleConfirmDocumentRaise} sx={{ position: 'absolute', bottom: 10, right: 10 }}>상신</Button>
          <Button onClick={handleTest} sx={{ position: 'absolute', bottom: 10, left: 10 }}>뒤로</Button>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CloseIcon onClick={handleClose} />
          </IconButton>
        </Box>
      </Modal>
    </Fragment>
  )
}

export const MemberSearchInput = ({ callbackApprovalLine }) => {
  const [members, setMembers] = useState([]);
  const [departmentInput, setDepartmentInput] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      const departmentId = sessionStorage.getItem('departmentId');
      const companyId = sessionStorage.getItem('companyId');
      const findMembers = await findDepartmentMembers(departmentId, companyId);
      setMembers(findMembers);
    }
    fetchMembers();
  }, []);

  const handleDepartmentInputChange = (event) => {
    setDepartmentInput(event.target.value);
  }

  const handleSearchMember = async () => {
    const companyId = sessionStorage.getItem('companyId');
    const departmentId = departmentInput;
    const findMembers = await findDepartmentMembers(departmentId, companyId);
    setMembers(findMembers);
  }

  return (
    <Fragment>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField id="input-with-sx" label="부서 코드" variant="standard"
            value={departmentInput}
            onChange={handleDepartmentInputChange} />
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            onClick={handleSearchMember} />
        </Box>
      </Box>
      <SearchMemberList callbackApprovalLine={callbackApprovalLine} searchResult={members} />
    </Fragment>
  );
}

export const SearchMemberList = (props) => {
  const members = props.searchResult;
  const callbackApprovalLine = props.callbackApprovalLine;
  const [approvalLines, setApprovalLines] = useState([]);
  const [approvalOrder, setApprovalOrder] = useState(1);

  const handleAddApprovalLine = (event) => {
    const approvalLinelistItem = event.currentTarget.parentNode;

    const approvalId = approvalLinelistItem.getAttribute('value');

    const name = approvalLinelistItem.querySelector('#search-member-name').innerText;
    const departmentName = approvalLinelistItem.querySelector('#search-department-name').innerText;

    setApprovalLines([...approvalLines,
    { approvalId: approvalId, name: name, departmentName: departmentName, approvalOrder: approvalOrder }]);

    setApprovalOrder(approvalOrder + 1);

    callbackApprovalLine(approvalLines); // 전 생성자가 안됨...
  }


  return <div>
    <h2>부서 검색 결과</h2>
    <ul>
      {members.map((member) => (
        <li key={member.memberId} value={member.memberId}>
          <span id="search-member-name">{member.name}</span>/
          <span id="search-department-name">{member.departmentName}</span>
          <button onClick={handleAddApprovalLine}>결재선 추가</button>
        </li>
      )
      )}
    </ul>

    <ApprovalLineList approvalLines={approvalLines}></ApprovalLineList>
  </div>
}

export const ApprovalLineList = (props) => {
  const approvalLines = props.approvalLines;

  return <div>
    <h2>결재선 지정자</h2>
    <ol>
      {approvalLines.map((approvalLine) => (
        <li key={approvalLine.approvalId}>
          <span>{approvalLine.name}</span>/
          <span>{approvalLine.departmentName}</span>
        </li>
      ))}
    </ol>
  </div>
}