import { useState } from "react";
import { getVacationOne, postVacationForm } from "../api/VacationApi";
import { dateToDatetime } from "../converter/RequestConverter";
import "../css/VacationForm.css"

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
        <div className="form-container">
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
    );
};

const VacationList = () => {
    const [vacationId, setVacationId] = useState('');
    const [vacation, setVacation] = useState({
        vacationId : '',
        requesterId : '',
        vacationDuration : {
            vacationType: '',
            startDateTime: '',
            endDateTime: ''
        },
        deducted: '',
        vacationStatus : ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = getVacationOne(vacationId); // vacationId를 이용하여 데이터 가져오기
            setVacation(data); // 가져온 데이터를 상태에 설정
            console.log("22222", vacation);
            console.log("333333" , vacation);
        } catch (error) {
            console.error('Failed to fetch vacation:', error.message);
        }
    }

    return (
        <div className="table-container">
            <form onSubmit={handleSubmit}>
                <label>
                    휴가 ID:
                    <input type="text" value={vacationId} onChange={(e) => setVacationId(e.target.value)} />
                </label>
                <button type="submit">검색</button>
            </form>

            {/* 데이터가 존재하는 경우에만 테이블 표시 */}
            {vacation.vacationId && (
                <table>
                    <thead>
                        <tr>
                            <th>휴가 ID</th>
                            <th>신청자 ID</th>
                            <th>휴가 유형</th>
                            <th>시작 일시</th>
                            <th>종료 일시</th>
                            <th>차감 일수</th>
                            <th>휴가 상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{vacation.vacationId}</td>
                            <td>{vacation.requesterId}</td>
                            <td>{vacation.vacationDuration.vacationType}</td>
                            <td>{vacation.vacationDuration.startDateTime}</td>
                            <td>{vacation.vacationDuration.endDateTime}</td>
                            <td>{vacation.deducted}</td>
                            <td>{vacation.vacationStatus}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};


export { VacationList, VacationForm };