let currentDraggedElement;
let tasks = [];


window.addEventListener("resize", updateHTML);


async function updateHTML() {
  await loadUserTasksFromBackend();
  setTimeout(() => {
    if (searchTask()) {
      filterAllTasks();
    }
    generateTemplate();
    updateProgressBars();
    updateProgressReport();
  }, 300)
}


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


function renderAllAssignedContacts(j, task, assignedContacts) {
  if (j > 2) {
    document.getElementById(`task-contacts-container${task["id"]}`).lastElementChild.innerHTML = generateAssignedContactsMoreThanFourHTML(task["assignedTo"]);
  } else {
    document.getElementById(`task-contacts-container${task["id"]}`).innerHTML += generateAssignedContactsHTML(getInitials(assignedContacts), setColorForInitial(getInitials(assignedContacts)));
  }
}


function filterAllTasks() {
  filterTasks(tasks, "to-do");
  filterTasks(tasks, "in-progress");
  filterTasks(tasks, "await-feedback");
  filterTasks(tasks, "done");
}


function findTask() {
  resetAllTasksContainer();
  let search = document.getElementById("search").value.toLowerCase().trim();
  filterSearchedTasks(tasks, "to-do", search);
  filterSearchedTasks(tasks, "in-progress", search);
  filterSearchedTasks(tasks, "await-feedback", search);
  filterSearchedTasks(tasks, "done", search);
  updateHTML();
}


function resetAllTasksContainer() {
  document.getElementById("to-do").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
}


function searchTask() {
  return document.getElementById("search").value == "";
}


function filterSearchedTasks(array, id, search) {
  let filter = array.filter((t) => (t["category"] == id && t["headline"].toLowerCase().match(search)) || (t["category"] == id && t["description"].toLowerCase().match(search)));
  for (let i = 0; i < filter.length; i++) {
    const element = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(element);
  }
}


function generateAssignedContactsMoreThanFourHTML(contact) {
  return `+${contact.length - 2}`;
}


function startDragging(id) {
  currentDraggedElement = id;
}


function allowDrop(ev) {
  ev.preventDefault();
}


async function moveTo(category) {
  tasks[currentDraggedElement]["category"] = category; // z.b. Todo mit id 1: Das Feld 'category' ändert sich zu 'open' oder 'closed'
  document.getElementById("search").value = "";
  await saveInBackendUserTasks();
  updateHTML();
};


function highlight() {
  document.querySelectorAll(".template-task").forEach((template) => {
    template.classList.add("drag-area-highlight");
  });
}


function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
  document.querySelectorAll(".template-task").forEach((task) => {
    task.style.display = "unset";
  });
  document.getElementById(id).style.display = "none";
}


function rotateTask() {
  document.getElementById(currentDraggedElement).classList.add("rotate");
}


function markAddIconAsActive(i) {
  let addIcon = document.getElementById(`add-icon${i}`);
  addIcon.style.backgroundImage = 'url("../img/plus-button-inactive.png")';
  addIcon.style.transition = "all 125ms ease-in-out";
}


function resetAddIcon() {
  document.querySelectorAll(".add-icon").forEach((add) => {
    add.style.backgroundImage = 'url("../img/plus-button.png")';
    add.style.transition = "all 125ms ease-in-out";
  });
}


function generateTemplate() {
  document.getElementById("to-do").innerHTML += templateTask(0);
  document.getElementById("in-progress").innerHTML += templateTask(1);
  document.getElementById("await-feedback").innerHTML += templateTask(2);
  document.getElementById("done").innerHTML += templateTask(3);
  if (window.innerWidth < 1400) {
    changeResponsiveTemplates();
  }
}


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


function templateTask(i) {
  return `<div id="template${i}" class="template-task"><div>`;
}


function openAddTaskDialog(id, id2, taskID) {
  document.getElementById(id).classList.remove("d-none");
  renderContactsInDropDown();
  setTimeout(() => {
    showTaskModal(id2, taskID);
    document.body.style.overflow = "hidden";
  }, 10);
}


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


function responsiveTaskModalAnimation(id2) {
  if (window.innerWidth > 768) {
    document.getElementById(id2).classList.add("slide-in-bottom");
  } else {
    document.getElementById(id2).classList.add("slide-in");
    document.getElementById('prio-overlay')
  }
}


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


function boardTaskContainerId(e) {
  return e.parentElement.parentElement.parentElement.parentElement.id; // Id from to-do, in-progress etc. containers
}


function editTasks(taskID) {
  document.getElementById("task-modal").innerHTML = generateEditTaskHTML(tasks[taskID]);
  renderContactsInEditDropDown(taskID);
  updateUrgencyBtns(taskID);
  checkCheckBoxInCollapseContacts(taskID);
}


function updateUrgencyBtns(taskID) {
  document.querySelectorAll('input[name="prio-edit"]').forEach((btn) => {
    if (btn.value == tasks[taskID]["priority"]) {
      btn.checked = true;
    }
  });
}

async function saveTasks(taskID) {
  getValueFromEditInputs(taskID);
  closeAddTaskDialog("task-modal", "task-overlay");
  await saveInBackendUserTasks();
  await updateHTML();
}


function getValueFromEditInputs(taskID) {
  let editHeadline = document.getElementById(`edit-headline${taskID}`).value;
  let editDescription = document.getElementById(`edit-description${taskID}`).value;
  let editDate = document.getElementById(`edit-date${taskID}`).value;
  let contactsCheckedBoxes = getCheckedBoxes("assign-contacts")
  document.querySelectorAll('input[name="prio-edit"]').forEach((check) => {
    if (check.checked) {
      tasks[taskID]["priority"] = check.value;
    }
  });
  tasks[taskID]["headline"] = editHeadline;
  tasks[taskID]["description"] = editDescription;
  tasks[taskID]["dueDate"] = editDate;
  tasks[taskID]["assignedTo"] = contactsCheckedBoxes;
}


function hoverButton(id) {
  let hover = document.getElementById(id);
  if (!hover.firstElementChild.checked) {
    if (id == "high" || id == "edit-high") {
      hover.classList.add("btn-high-hover");
    } else if (id == "medium" || id == "edit-medium") {
      hover.classList.add("btn-medium-hover");
    } else if (id == "low" || id == "edit-low") {
      hover.classList.add("btn-low-hover");
    }
  }
}


function leaveHoverButton(id) {
  let hover = document.getElementById(id);
  if (id == "high" || id == "edit-high") {
    hover.classList.remove("btn-high-hover");
  } else if (id == "medium" || id == "edit-medium") {
    hover.classList.remove("btn-medium-hover");
  } else if (id == "low" || id == "edit-low") {
    hover.classList.remove("btn-low-hover");
  }
}


function checkButton(id) {
  let button = document.getElementById(id);
  button.firstElementChild.checked = true;
}


function openSubtaskInput() {
  document.getElementById("subtasks-area").classList.add("d-none");
  document.getElementById("subtasks-input-area").classList.remove("d-none");
  document.getElementById("subtask-input").value = "";
  document.getElementById("subtask-input").focus();
}


function closeSubtaskInput() {
  document.getElementById("subtasks-input-area").classList.add("d-none");
  document.getElementById("subtasks-area").classList.remove("d-none");
  document.getElementById("subtask-input").value = "";
}


function addSubtask() {
  let input = document.getElementById("subtask-input").value;
  if (input) {
    document.getElementById("subtask-container").innerHTML += createSubtaskHTML(input);
    closeSubtaskInput();
  }
}


function openContactInput(id, id2, id3) {
  document.getElementById(id).classList.add("d-none");
  document.getElementById(id2).classList.remove("d-none");
  document.getElementById(id3).value = "";
  document.getElementById(id3).focus();
}


function closeContactInput(id, id2, id3) {
  document.getElementById(id).classList.add("d-none");
  document.getElementById(id2).classList.remove("d-none");
  document.getElementById(id3).value = "";
}


function addContact() {
  let input = document.getElementById("contact-input").value;
  if (input) {
    document.getElementById("contact-container").innerHTML += createContactHTML();
    closeContactInput();
  }
}


function openCategoryInput() {
  document.getElementById("category-dropdown").classList.add("d-none");
  document.getElementById("category-input-area").classList.remove("d-none");
  document.getElementById("category-input").value = "";
  document.getElementById("category-input").focus();
}


function closeCategoryInput() {
  document.getElementById("category-input-area").classList.add("d-none");
  document.getElementById("category-dropdown").classList.remove("d-none");
  document.getElementById("category-input").value = "";
}


async function createTask() {
  let title = document.getElementById("title").value;
  let contactsCheckedBoxes = getCheckedBoxes("assign-contacts");
  if (contactsCheckedBoxes == null) {
    let validation = document.getElementById("title");
    validation.setCustomValidity("Must set at least one contact");
    validation.reportValidity();
    return;
  }
  let date = document.getElementById("date").value;
  let category = document.getElementById('category-dropdown').textContent;
  let urgency = document.querySelector('input[name="prio"]:checked').value;
  let description = document.getElementById("description-text").value;
  let color = document.querySelector("input[type=radio][name=color]:checked").value;
  createNewTask(tasks.length, category, title, description, contactsCheckedBoxes, urgency, date, color);
}


async function createNewTask(array, category, title, description, contactsCheckedBoxes, urgency, date, color) {
  new CreateTask(tasks.length, category, title, description, contactsCheckedBoxes, urgency, date, color);
  await saveInBackendUserTasks(tasks.length); // this saves all tasks in Backend
  await updateHTML();
  taskAddedToBoard();
  setTimeout(() => {
    closeAddTaskDialog("add-task-modal", "add-task-overlay");
    closeTaskAddedToBoard();
    resetAddTaskForm();
  }, 1000);
}


// Pass the checkbox name to the function
function getCheckedBoxes(chkboxName) {
  let checkboxes = document.getElementsByName(chkboxName);
  let checkboxesChecked = [];
  // loop over them all
  for (let i = 0; i < checkboxes.length; i++) {
    // And stick the checked ones onto an array...
    if (checkboxes[i].checked) {
      checkboxesChecked.push(checkboxes[i].value);
    }
  }
  // Return the array if it is non-empty, or null
  return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}


function resetAddTaskForm() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.querySelector('input[name="prio"]:checked').checked = false;
  document.getElementById("description-text").value = "";
  document.querySelectorAll('input[name="assign-contacts"]:checked').forEach((checkbox) => {
    checkbox.checked = false;
  });
  document.querySelector("input[type=radio][name=color]:checked").checked = false;
  document.getElementById('category-dropdown').innerHTML = `<span>Select task category</span><img src="../img/select-arrow.png" alt="">`;
  document.getElementById('category-dropdown').classList.remove('dropdown-active');
}


function taskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.classList.add("slide-in-bottom");
}


function closeTaskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.style.transform = "translateX(950px)";
  taskAdded.classList.remove("slide-in-bottom");
  setTimeout(() => {
    resetTaskAddedToBoard();
  }, 200);
}


function resetTaskAddedToBoard() {
  let taskAdded = document.getElementById("task-added");
  taskAdded.style.transform = "";
}