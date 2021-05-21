export const getDuration = (duration) => {
    duration = parseInt(duration)/1000;
    
    let seconds = Math.floor(duration%60);
    duration /= 60;
    
    let minutes = Math.floor(duration%60);
    duration /= 60;
    
    let hours = Math.floor(duration);
    
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(hours < 10) {
        hours = `0${hours}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}

export const getDateAndTime = (dateString) => {
    const dateObject = new Date(dateString);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const date = dateObject.getDate();

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();

    if(hours < 10) {
        hours = `0${hours}`;
    }

    if(minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${month} ${date},${year} ${hours}:${minutes}`;
}

export const getDate = (dateString) => {
    const dateObject = new Date(dateString);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const date = dateObject.getDate();

    return `${month} ${date},${year}`;
}

export const getTimeBeforeContest = (timeInMilliseconds) => {
    let duration = timeInMilliseconds/1000;
    
    let seconds = Math.floor(duration%60);
    duration /= 60;
    
    let minutes = Math.floor(duration%60);
    duration /= 60;
    
    let hours = Math.floor(duration%24);
    duration /= 24;

    let days = Math.floor(duration);

    let value = '';
    if(days !== 0) {
        value += days === 1 ? ` ${days} day` : ` ${days} days`;
    }
    if(hours !== 0) {
        value += hours === 1 ? ` ${hours} hour` : ` ${hours} hours`;
    }
    if(minutes !== 0) {
        value += minutes === 1 ? ` ${minutes} minute` : ` ${minutes} minutes`;
    }
    if(seconds !== 0) {
        value += seconds === 1 ? ` ${seconds} second` : ` ${seconds} seconds`;
    }
    

    return value;
}

export const getTimeLeftForContestToEnd = (timeInMilliseconds) => {
    let duration = timeInMilliseconds/1000;
    
    let seconds = Math.floor(duration%60);
    duration /= 60;
    
    let minutes = Math.floor(duration%60);
    duration /= 60;
    
    let hours = Math.floor(duration);

    let value = '';
    if(hours !== 0) {
        value += hours === 1 ? ` ${hours} hour` : ` ${hours} hours`;
    }
    if(minutes !== 0) {
        value += minutes === 1 ? ` ${minutes} minute` : ` ${minutes} minutes`;
    }
    if(seconds !== 0) {
        value += seconds === 1 ? ` ${seconds} second` : ` ${seconds} seconds`;
    }

    return value;
}