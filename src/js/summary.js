function renderActiveUserName() {
    document.getElementById('active-user-name').innerHTML = activeUser.userName;
}

function renderDayGreeting() {
    let greeting = getDayTime();
    document.getElementById('day-time').innerHTML = greeting;
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