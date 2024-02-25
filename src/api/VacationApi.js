const postVacationForm = async function (formData) {
    await fetch('http://localhost:8080/api/vacations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then(() => console.log('request successfully'))
        .catch(() => console.error('request fail'));
}

const getVacations = function (memberId) {
    return fetch(`http://localhost:8080/api/members/${memberId}/vacations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .catch(() => console.error('request fail'));
}

const getVacationOne = function (memberId, vacationId) {
    return fetch(`http://localhost:8080/api/members/${memberId}/vacations/${vacationId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .catch(() => console.error('request fail'));
}


export { postVacationForm, getVacations, getVacationOne };