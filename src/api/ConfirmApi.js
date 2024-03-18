export const enrollApprovalLines = (enrollApprovalLineForm) => {
    return fetch(`/api/confirm-documents/${confirmDocumentId}/approval-lines`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(enrollApprovalLineForm)
    }).then((response) => response.json())
    .catch(() => console.error('request fail'));
}