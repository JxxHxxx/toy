const dateToDatetime = (formData) => {
    formData.vacationDuration.startDateTime += 'T00:00';
    formData.vacationDuration.endDateTime += 'T00:00';

    return formData;
}

export {dateToDatetime};