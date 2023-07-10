export const generateDateFormat = (date, time) => {
    const userStartDate = date.split("/")
    const userStartTime = time.split(":")
    const userTimeString = `${userStartDate[2]}-${userStartDate[0]}-${userStartDate[1]}T${userStartTime[0]}:${userStartTime[1]}-0600`
    return new Date(userTimeString)
}

export const checkConflict = (startDate, startTime, checkDate, checkTime) => {
    const userStart = generateDateFormat(startDate, startTime)
    const userEnd = new Date(userStart.getTime() + (30 * 60000))
    const newStart = generateDateFormat(checkDate, checkTime)
    const newEnd = new Date(newStart.getTime() + (30 * 60000))
    //Scheduling ahead conflict
    if( newStart >= userStart && newStart <= userEnd){
        return true
    }
    //Scheduling previous conflict
    if (userStart >= newStart && userStart <= newEnd){
        return true
    }
    return false
}