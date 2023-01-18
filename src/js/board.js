/***    Variable    ***/
let currentDraggedElement;


/***    Array       ***/
let tasks = [];


/**
 * The function is colling the follow up functions to update the "Board".
 */
async function updateHTML() {
  await loadUserTasksFromBackend();
  setTimeout(() => {
    if (searchTask()) {
      filterAllTasks();
    }
    generateTemplate();
    updateProgressBars();
    updateProgressReport();
  }, 1000)
}


/**
 * The function filters the task and generate the task on board ;
 * 
 * @param {array} array - The array contain all tasks;
 * @param {string} id - The id corresponds to the intendend section of the "Board"
 */
function filterTasks(array, id) {
  let filter = array.filter((t) => t["category"] == id);
  document.getElementById(id).innerHTML = "";
  for (let i = 0; i < filter.length; i++) {
    const task = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(task);
    for (let j = 0; j < task["assignedTo"].length; j++) {
      const assignedContacts = task["assignedTo"][j];
      renderAllAssignedContacts(j, task, assignedContacts);
    }
  }
}


/**
 * The function is showing the initials of the people assigned to the task.
 * 
 * @param {number} j - The value is provided by the for loop;  
 * @param {obje} task - The data corestponding to the task.
 * @param {*} assignedContacts - The name of the person assigned to the task.
 */
function renderAllAssignedContacts(j, task, assignedContacts) {
  if (j > 2) {
    document.getElementById(`task-contacts-container${task["id"]}`).lastElementChild.innerHTML = generateAssignedContactsMoreThanFourHTML(task["assignedTo"]);
  } else {
    document.getElementById(`task-contacts-container${task["id"]}`).innerHTML += generateAssignedContactsHTML(getInitials(assignedContacts), setColorForInitial(getInitials(assignedContacts)));
  }
}


/**
 * The funtion is colling the follow up functions in order to filter all the tasks.
 */
function filterAllTasks() {
  filterTasks(tasks, "to-do");
  filterTasks(tasks, "in-progress");
  filterTasks(tasks, "await-feedback");
  filterTasks(tasks, "done");
}


/**
 * The function is searching for the task given by the user.
 */
function findTask() {
  resetAllTasksContainer();
  let search = document.getElementById("search").value.toLowerCase().trim();
  filterSearchedTasks(tasks, "to-do", search);
  filterSearchedTasks(tasks, "in-progress", search);
  filterSearchedTasks(tasks, "await-feedback", search);
  filterSearchedTasks(tasks, "done", search);
  updateHTML();
}


/**
 * The function clears the tasks shown on the board.
 */
function resetAllTasksContainer() {
  document.getElementById("to-do").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}


/**
 * The function is checking if given value is null.
 * 
 * @returns "True" or "False".
 */
function searchTask() {
  return document.getElementById("search").value == "";
}


/**
 * The function is searching throw all tasks and is showing on "Board" if something is found.
 * 
 * @param {array} array - The List of all tasks. 
 * @param {string} id - The text coresponding to the board section.
 * @param {string} search - The searched text given by the user.
 */
function filterSearchedTasks(array, id, search) {
  let filter = array.filter((t) => (t["category"] == id && t["headline"].toLowerCase().match(search)) || (t["category"] == id && t["description"].toLowerCase().match(search)));
  for (let i = 0; i < filter.length; i++) {
    const element = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(element);
  }
}


/**
 * The function is showing the number of the additional people assigned to the task .
 * 
 * @param {array} contact - List of people assigned to the task.
 * @returns - Creates the html element.
 */
function generateAssignedContactsMoreThanFourHTML(contact) {
  return `+${contact.length - 2}`;
}


/**
 * The function provides the id of the task.
 * 
 * @param {*} id 
 */
function startDragging(id) {
  currentDraggedElement = id;
}


/**
 * The functions is verifing the drop event
 * 
 * @param {event} ev - Drag event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}


/**
 * The function is being moved to the "category" follow by updating the server and the board.
 * 
 * @param {string} category - The section where the task is meeing moved to.
 */
async function moveTo(category) {
  tasks[currentDraggedElement]["category"] = category; // z.b. Todo mit id 1: Das Feld 'category' ändert sich zu 'open' oder 'closed'
  document.getElementById("search").value = "";
  await saveInBackendUserTasks();
  updateHTML();
};


/**
 * The function is highlighting the draging area.
 */
function highlight() {
  document.querySelectorAll(".template-task").forEach((template) => {
    template.classList.add("drag-area-highlight");
  });
}


/**
 * The function remove the starting point highlinght of the dragable element.   
 * 
 * @param {string} id - Dragable area id.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
  document.querySelectorAll(".template-task").forEach((task) => {
    task.style.display = "unset";
  });
  document.getElementById(id).style.display = "none";
}


/**
 * The function provide an different angle to the element that is being draged.
 */
function rotateTask() {
  document.getElementById(currentDraggedElement).classList.add("rotate");
}


/**
 * The function animates the "+" sign from each board section.
 * 
 * @param {number} i - Number provided in HTML text.
 */
function markAddIconAsActive(i) {
  let addIcon = document.getElementById(`add-icon${i}`);
  addIcon.style.backgroundImage = 'url("../img/plus-button-inactive.png")';
  addIcon.style.transition = "all 125ms ease-in-out";
}


/**
 * The function changes all the "+" sign to its initial form.
 */
function resetAddIcon() {
  document.querySelectorAll(".add-icon").forEach((add) => {
    add.style.backgroundImage = 'url("../img/plus-button.png")';
    add.style.transition = "all 125ms ease-in-out";
  });
}


/**
 * The function calls the follow up functions to generate the tasks in each board section.
 */
function generateTemplate() {
  document.getElementById("to-do").innerHTML += templateTask(0);
  document.getElementById("in-progress").innerHTML += templateTask(1);
  document.getElementById("await-feedback").innerHTML += templateTask(2);
  document.getElementById("done").innerHTML += templateTask(3);
  if (window.innerWidth < 1400) {
    changeResponsiveTemplates();
  }
}


/**
 * The function changes the elements orientation to optimize responsive.
 */
function changeResponsiveTemplates() {
  let template = document.getElementById("to-do").lastElementChild;
  let toDo = document.getElementById("to-do");
  let template1 = document.getElementById("in-progress").lastElementChild;
  let inProgress = document.getElementById("in-progress");
  let template2 = document.getElementById("await-feedback").lastElementChild;
  let awaitFeedback = document.getElementById("await-feedback");
  let template3 = document.getElementById("done").lastElementChild;
  let done = document.getElementById("done");
  toDo.insertBefore(template, toDo.children[0]);
  inProgress.insertBefore(template1, inProgress.children[0]);
  awaitFeedback.insertBefore(template2, awaitFeedback.children[0]);
  done.insertBefore(template3, done.children[0]);
}


/**
 * The function contains the HTML template coresponding to the tasks shown on board.
 * 
 * @param {number} i - Task id. 
 * @returns HTML element
 */
function templateTask(i) {
  return `<div id="template${i}" class="template-task"><div>`;
}


/**
 * The function is calling the follow up function in order to show the clicked task or "Add Task"
 * 
 * @param {string} id - Name of the id of the element to be shown.
 * @param {string} id2 - Name of the id of the element to be compared in follow up function.
 * @param {*} taskID 
 */
function openAddTaskDialog(id, id2, taskID) {
  document.getElementById(id).classList.remove("d-none");
  renderContactsInDropDown();
  setTimeout(() => {
    showTaskModal(id2, taskID);
    document.body.style.overflow = "hidden";
  }, 10);
}


/**
 * The function decides if task needs to be shown or the "Add Task" have to slide in.
 * 
 * @param {string} id2 - Id of the Html element to be compared.
 * @param {number} taskID - The value is a number is task exists or "undefined" if new task is required.
 */
function showTaskModal(id2, taskID) {
  if (id2 == "task-modal") {
    document.getElementById("task-modal").innerHTML = generateTaskModalHTML(tasks[taskID]);
    for (let i = 0; i < tasks[taskID]["assignedTo"].length; i++) {
      const contacts = tasks[taskID]["assignedTo"][i];
      document.getElementById(`assigned-contacts${taskID}`).innerHTML += generateTaskModalContactsHTML(getInitials(contacts), contacts, setColorForInitial(getInitials(contacts)));
    }
    responsiveTaskModalAnimation(id2);
  } else {
    document.getElementById(id2).classList.add("slide-in");
  }
}


/**
 * The function is optimiting for responsive.
 * 
 * @param {string} id2 - Id of the Html element to be manipulated.
 */
function responsiveTaskModalAnimation(id2) {
  if (window.innerWidth > 768) {
    document.getElementById(id2).classList.add("slide-in-bottom");
  } else {
    document.getElementById(id2).classList.add("slide-in");
    document.getElementById('prio-overlay')
  }
}


/**
 * The function is optimiting for responsive.
 * 
 * @param {string} id - Id of the Html element to be manipulated.
 * @param {string} id2 - Id of the Html element to be manipulated.
 */
function closeAddTaskDialog(id, id2) {
  if (id == "task-modal" && window.innerWidth > 768) {
    document.getElementById(id).classList.remove("slide-in-bottom");
  } else {
    document.getElementById(id).classList.remove("slide-in");
  }
  setTimeout(() => {
    document.getElementById(id2).classList.add("d-none");
    document.body.style.overflow = "unset";
    resetAddIcon();
  }, 200);
}


/**
 * The function modifies the Html element to show the completion of the task.
 */
function updateProgressBars() {
  document.querySelectorAll(".progress-bar").forEach((e) => {
    if (boardTaskContainerId(e) == "to-do") {
      e.style.width = 0;
    } else if (boardTaskContainerId(e) == "in-progress") {
      e.style.width = 33 + "%";
    } else if (boardTaskContainerId(e) == "await-feedback") {
      e.style.width = 66 + "%";
    } else if (boardTaskContainerId(e) == "done") {
      e.style.width = 100 + "%";
    }
  });
}


/**
 * The function is updating the Html element to show the completion of the task.
 */
function updateProgressReport() {
  document.querySelectorAll(".progress-report").forEach((e) => {
    if (boardTaskContainerId(e) == "to-do") {
      e.innerHTML = 0;
    } else if (boardTaskContainerId(e) == "in-progress") {
      e.innerHTML = 1;
    } else if (boardTaskContainerId(e) == "await-feedback") {
      e.innerHTML = 2;
    } else if (boardTaskContainerId(e) == "done") {
      e.innerHTML = 3;
    }
  });
}


/**
 * The function provides the board section id.
 * @param {string} e - Stores the id.
 * @returns - the id of the board section.
 */
function boardTaskContainerId(e) {
  return e.parentElement.parentElement.parentElement.parentElement.id; // Id from to-do, in-progress etc. containers
}


/**
 * The function allow the selected tesk to be edited.
 * 
 * @param {number} taskID - Value coresponding to the task id.
 */
function editTasks(taskID) {
  document.getElementById("task-modal").innerHTML = generateEditTaskHTML(tasks[taskID]);
  renderContactsInEditDropDown(taskID);
  updateUrgencyBtns(taskID);
  for (let i = 0; i < tasks[taskID]["assignedTo"].length; i++) {
    const contacts = tasks[taskID]["assignedTo"][i];
    document.getElementById('assigned-contacts').innerHTML += generateTaskModalContactsInitialsHTML(getInitials(contacts), contacts, setColorForInitial(getInitials(contacts)));
  }
}


/**
 * The function does update the priority of the task
 * 
 * @param {number} taskID -  Value coresponding to the task id.
 */
function updateUrgencyBtns(taskID) {
  document.querySelectorAll('input[name="prio-edit"]').forEach((btn) => {
    if (btn.value == tasks[taskID]["priority"]) {
      btn.checked = true;
    }
  });
}


/**
 * The function calls a serial of functions in order to save and update the task.
 * 
 * @param {number} taskID -  Value coresponding to the task id. 
 */
async function saveTasks(taskID) {
  getValueFromEditInputs(taskID);
  closeAddTaskDialog("task-modal", "task-overlay");
  await saveInBackendUserTasks();
  await updateHTML();
}



/**
 * The function is showing the confirmation of the task being added.
 */
function taskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.classList.add("slide-in-bottom");
}


/**
 * The function does remove the confirmation of the task being added.
 */
function closeTaskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.style.transform = "translateX(950px)";
  taskAdded.classList.remove("slide-in-bottom");
  setTimeout(() => {
    resetTaskAddedToBoard();
  }, 200);
}


/**
 * The function reposition the confirmation, of the task being added, to the initial position.
 */
function resetTaskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.style.transform = "";
}