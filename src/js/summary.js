const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function initSummary() {
  await init();
  // await loadActiveUserFromBackend();
  renderGreeting();
  renderTodaysDate();
  renderBoardStatistics();
}

function renderGreeting() {
  renderActiveUserName();
  renderDayGreeting();
}

function renderActiveUserName() {
  document.getElementById("active-user-name").innerHTML = activeUser.userName;
}

function renderDayGreeting() {
  let greeting = getDayTime();
  document.getElementById("day-time").innerHTML = greeting;
}

function renderTodaysDate() {
  let { day, month, year } = createDate();
  document.getElementById("date-of-today").innerHTML = `${month} ${day},  ${year}`;
}

function getDayTime() {
  let date = new Date();
  let hours = date.getHours();
  if (hours > 0 && hours < 12) {
    return "Good morning, ";
  } else if (hours >= 12 && hours < 18) {
    return "Good afternoon, ";
  } else {
    return "Good evening, ";
  }
}

function renderBoardStatistics() {
  renderTaskInBoard();
  filterTasksUrgent();
  filterProgress();
  filterAwaitingFeedback();
  filterTasksDone();
  filterTasksToDo();
}

function renderTaskInBoard() {
  return (document.getElementById("task-in-board").innerHTML = `${tasks.length}`);
}

function filterProgress() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "in-progress";
  });
  return (document.getElementById("task-in-progress").innerHTML = `${filteredItems.length}`);
}

function filterAwaitingFeedback() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "await-feedback";
  });
  return (document.getElementById("awaiting-feedback").innerHTML = `${filteredItems.length}`);
}

function filterTasksDone() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "done";
  });
  return (document.getElementById("tasks-done").innerHTML = `${filteredItems.length}`);
}

function filterTasksToDo() {
  let filteredItems = tasks.filter((item) => {
    return item.category == "to-do";
  });
  return (document.getElementById("tasks-to-do").innerHTML = `${filteredItems.length}`);
}

function filterTasksUrgent() {
  let filteredItems = tasks.filter((item) => {
    return item.priority == "high";
  });
  return (document.getElementById("tasks-urgent").innerHTML = `${filteredItems.length}`);
}

// function filterProgress() {
//     let result = tasks.filter((item) => {
//         item.category == "in-progress";
//     });
//     return (document.getElementById("task-in-progress").innerHTML = `${result.length}`);
// }

// function renderTaskInProgress() {
//     let item;
//     const result = tasks.filter((word) => {
//         console.log(word.)

//     });
//     document.getElementById('task-in-board').innerHTML = `${tasks.length}`;
// }

//////////////// HELPER-FUNCTIONS ////////////////////
function createDate() {
  let date = new Date();
  let fullDate = {
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
  };
  return fullDate;
}

// function getWeekday() {
//     let weekday = new Date();
//     let day = weekday.getDay();
//     let today = weekdays[day];
//     return today;
// }
