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

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const date = dateObject.getDate();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    return `${month}/${date}/${year} ${hours}:${minutes}:${seconds}`;
}

export const getDate = (dateString) => {
    const dateObject = new Date(dateString);

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const year = dateObject.getFullYear();
    const month = months[dateObject.getMonth()];
    const date = dateObject.getDate();

    return `${month}/${date}/${year}`;
}