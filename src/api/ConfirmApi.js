export const enrollApprovalLines = (confirmDocumentId, enrollApprovalLineForm) => {
    return fetch(`http://localhost:8000/api/confirm-documents/${confirmDocumentId}/approval-lines`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(enrollApprovalLineForm)
    }).then((response) => response.json())
    .catch(() => console.error('request fail'));
}

export const raiseConfirmDucument = (confirmDocumentId, confirmRaiseForm) => {
    return fetch(`http://localhost:8000/api/confirm-documents/${confirmDocumentId}/raise`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(confirmRaiseForm)
    }).then((response) => response.json())
    .catch(() => console.error('request fail'));
}