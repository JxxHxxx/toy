import { useState } from "react";

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
        // Assuming you have a function to send the form data to the server
        sendFormDataToServerV2(form);
    };

    const sendFormDataToServerV2 = async function (formData) {
        // Manipulate the startDateTime and endDateTime values before sending
        formData.vacationDuration.startDateTime += 'T00:00';
        formData.vacationDuration.endDateTime += 'T00:00';

        await fetch('http://localhost:8080/api/vacations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(() => console.log('request successfully'))
          .catch(() => console.error('request fail'));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    아이디:
                    <input type="text" name="requesterId" value={form.requesterId} onChange={onChange} />
                </label>

                <label>
                    연차 유형:
                    <input type="text" name="vacationType" value={form.vacationDuration.vacationType} onChange={onVacationDurationChange} />
                </label>

                <label>
                    연차 시작 날짜:
                    <input type="date" name="startDateTime" value={form.vacationDuration.startDateTime} onChange={onVacationDurationChange} />
                </label>

                <label>
                    연차 종료 날짜:
                    <input type="date" name="endDateTime" value={form.vacationDuration.endDateTime} onChange={onVacationDurationChange} />
                </label>

                <input type="submit" value="휴가 신청" />
            </form>
        </div>
    );
};

export default VacationForm;