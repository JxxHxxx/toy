const getMyVacations = function (memberId) {
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

const searchVacations = function (companyId, departmentId) {
    return fetch(`http://localhost:8080/api/vacations?companyId=${companyId}&departmentId=${departmentId}`, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    }).then((response) => response.json())
    .catch(() => console.error('request fail'))
}

const getMemberLeave = function (memberId) {
    return fetch(`http://localhost:8080/api/member-leaves/${memberId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .catch(() => console.error('request fail'));
}

const postCreateVacation = function (requestBody) {
    return fetch(`http://localhost:8080/api/vacations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(requestBody)

    }).then((response) => response.json())
        .catch(() => console.error('request fail'));
}


export { getMyVacations, getVacationOne, searchVacations, getMemberLeave, postCreateVacation };