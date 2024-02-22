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

const getVacationOne = function (vacationId) {
    const response = fetch('http://localhost:8080/api/vacations/' + vacationId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },   
    }).then((response) => response.json())
      .catch(() => console.error('request fail'));
}


export {postVacationForm, getVacationOne};