export const findDepartmentMembers = (departmentId, companyId) => {
    return fetch(`http://localhost:8080/api/departments/${departmentId}/member-leaves?cid=${companyId}`, {
        method : 'GET',
        headers : {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
    .catch(() => console.error('request fail'));
}