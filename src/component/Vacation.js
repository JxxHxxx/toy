import { useState } from "react";
import { getVacations, postVacationForm } from "../api/VacationApi";
import { dateToDatetime } from "../converter/RequestConverter";
import "../css/VacationForm.css"
import "../css/VacationList.css"
import { Button, TextField } from "@mui/material";
import { MemberLeave } from "../component/MemberLeave";


const VacationForm = () => {
    const [form, setForm] = useState({
        requesterId: '',
        vacationDuration: {
            vacationType: '',
            startDateTime: '',
            endDateTime: ''
        }
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const onVacationDurationChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            vacationDuration: {
                ...prevForm.vacationDuration,
                [name]: value
            }
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const processedForm = dateToDatetime(form);
        postVacationForm(processedForm);
    };

    return (
        <div>
            <MemberLeave></MemberLeave>

            <div className="form-container" id="form">
                <form onSubmit={onSubmit}>
                    <fieldset>
                        <legend>휴가 신청</legend>

                        <div className="form-field">
                            <label htmlFor="requesterId">아이디:</label>
                            <input type="text" id="requesterId" name="requesterId" value={form.requesterId} onChange={onChange} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="vacationType">연차 유형:</label>
                            <input type="text" id="vacationType" name="vacationType" value={form.vacationDuration.vacationType} onChange={onVacationDurationChange} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="startDateTime">연차 시작 날짜:</label>
                            <input type="date" id="startDateTime" name="startDateTime" value={form.vacationDuration.startDateTime} onChange={onVacationDurationChange} />
                        </div>

                        <div className="form-field">
                            <label htmlFor="endDateTime">연차 종료 날짜:</label>
                            <input type="date" id="endDateTime" name="endDateTime" value={form.vacationDuration.endDateTime} onChange={onVacationDurationChange} />
                        </div>

                        <div className="form-actions">
                            <input type="submit" value="휴가 신청" />
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

const VacationList = () => {
    const [memberId, setMemberId] = useState('');
    const [vacationId, setVacationId] = useState('');
    const [vacations, setVacations] = useState([]);

    const vacationRows = vacations.map((vacation) => {
        const startDate = new Date(vacation.vacationDuration.startDateTime).toISOString().split('T')[0];
        const endDate = new Date(vacation.vacationDuration.endDateTime).toISOString().split('T')[0];

        return <tr key={vacation.vacationId}>
            <td>{vacation.requesterName}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
        </tr>
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
        <div className="table-container" id="list">
            <h2>휴가 검색!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="outlined-user"
                        label="사용자ID"
                        variant="outlined"
                        size="small"
                        margin="dense"
                        value={memberId} onChange={(e) => setMemberId(e.target.value)} />
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

            <table>
                <thead>
                    <tr>
                        <th>신청자 이름</th>
                        <th>시작 일시</th>
                        <th>종료 일시</th>
                    </tr>
                </thead>
                <tbody>
                    {vacationRows}
                </tbody>
            </table>
        </div>
    );
};


export { VacationList, VacationForm };
