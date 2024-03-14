
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

const checkAuthenticate = function () {
    return fetch(`http://localhost:8080/api/auth/check-authentication`, {
        method : 'GET',
        credentials : 'include',
    })
}


export {postSignIn, checkAuthenticate};