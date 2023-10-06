
const getDateStartAndEndTime = (datetime) => {
    let days_time = datetime.split(' ');
    let times = days_time[1].split('-');
    return [days_time[0], times[0], times[1]];
}

const checkDayConflict = (days1, days2) => {
    const days = ['M', 'Tu', 'W', 'Th', 'F'];
    for (let i = 0; i < 5; i++) {
        if (days1.includes(days[i]) && days2.includes(days[i])) {
            return true;
        }
    }
    return false;
}

const checkTimeConflict = (start1, end1, start2, end2) => {
    if (start1 <= start2 && end1 > start2) {
        return true;
    }
    if (start2 <= start1 && end2 > start1) {
        return true;
    }
    return false;
}

export const checkConflict = (selected, course) => {
    for (let i = 0; i < selected.length; i++) {
        if (selected[i] === course) {
            return false;
        }
        if (selected[i].term === course.term) {
            let [day1, start1, end1] = getDateStartAndEndTime(selected[i].meets);
            let [day2, start2, end2] = getDateStartAndEndTime(course.meets);
            if (checkDayConflict(day1, day2) && checkTimeConflict(start1, end1, start2, end2)) {
                return true;
            }
        }
    }
    return false;
}