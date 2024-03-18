
const postSignIn = function (loginForm) {
    return fetch(`http://localhost:8080/api/auth/login`, {
        method: 'POST',
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginForm)
    }).then((response) => response.json())
    .catch(() => console.error('request fail'));
}

const postUserAuthentication = function () {
    return fetch(`http://localhost:8080/api/auth/check-authentication`, {
        method : 'POST',
        credentials : 'include',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'memberId' : sessionStorage.getItem('memberId'),
            'companyId' : sessionStorage.getItem('companyId'),
            'departmentId' : sessionStorage.getItem('departmentId')
        })
    })
}


export {postSignIn, postUserAuthentication };