const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function renderGreeting() {
    renderActiveUserName();
    renderDayGreeting();
}

function renderActiveUserName() {
    document.getElementById('active-user-name').innerHTML = activeUser.userName;
}

function renderDayGreeting() {
    let greeting = getDayTime();
    document.getElementById('day-time').innerHTML = greeting;
}

function renderTodaysDate(){
let {day, month, year} =  createDate();
document.getElementById('date-of-today').innerHTML = `${month} ${day},  ${year}`; 
}

function getDayTime() {
    let date = new Date();
    let hours = date.getHours();
    if (hours > 0 && hours < 12) {
        return 'Good morning, '        
    } else if (hours >= 12 && hours < 18) {
return 'Good afternoon, '
    } else {
        return 'Good evening, '
    }
};

function createDate() {
    let date = new Date();
    let fullDate = {
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
    } 
    return fullDate;
}

// function getWeekday() {
//     let weekday = new Date();
//     let day = weekday.getDay();
//     let today = weekdays[day];
//     return today;
// }