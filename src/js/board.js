let currentDraggedElement;

const color = {
  design: "#FF7A00",
  sales: "#FC71FF",
  backoffice: "#1FD7C1",
  marketing: "#0038FF",
  media: "#FFC701",
};

let tasks = [
  // {
  //     id: 0,
  //     department: 'Design',
  //     headline: 'Website redesign',
  //     description: 'Modify the contents of the main website..',
  //     assignedTo: ['Stefan Meier', 'Marvin Vogel', 'Elisabeth Friedrich', 'Felix Müller'],
  //     priority: 'low',
  //     category: 'to-do',
  //     dueDate: '2022-08-05'
  // },
  // {
  //     id: 1,
  //     department: 'Sales',
  //     headline: 'Call potencial clients',
  //     description: 'Make the product presentation to prospective buyers',
  //     assignedTo: ['Felix Müller', 'Franziska Schütz'],
  //     priority: 'high',
  //     category: 'in-progress',
  //     dueDate: '2022-08-05'
  // },
  // {
  //     id: 2,
  //     department: 'Backoffice',
  //     headline: 'Accounting invoices',
  //     description: 'Write open invoices for customer',
  //     assignedTo: ['Max Mustermann', 'Frank Hausner', 'Stefan Meier', 'Marvin Vogel', 'Elisabeth Friedrich'],
  //     priority: 'medium',
  //     category: 'await-feedback',
  //     dueDate: '2022-08-05'
  // },
  // {
  //     id: 3,
  //     department: 'Media',
  //     headline: 'Video cut',
  //     description: 'Edit the new company video',
  //     assignedTo: ['Sandra Walter', 'Theo Ochs', 'Olaf Siegfried'],
  //     priority: 'medium',
  //     category: 'await-feedback',
  //     dueDate: '2022-08-05'
  // },
  // {
  //     id: 4,
  //     department: 'Marketing',
  //     headline: 'Social media strategy',
  //     description: 'Develop an ad campaign for brand positioning',
  //     assignedTo: ['Jennifer Bern'],
  //     priority: 'low',
  //     category: 'done',
  //     dueDate: '2022-08-05'
  // }
];

window.addEventListener("resize", updateHTML);

function changeDepartmentColor() {
  let departmentColor;
  document.querySelectorAll(".department").forEach((department) => {
    // searches through all classes with the name of department and is iterating through nodelist
    departmentColor = department.innerHTML.toLowerCase(); // saves value(text) from span in variable
    department.style.backgroundColor = color[departmentColor]; // sets the background color to the correct value
  });
}

async function updateHTML() {
  // if (window.innerWidth < 768) {
  //     // debugger;
  //     generateTemplate();
  //     if (searchTask()) {
  //         filterAllTasks();
  //     }
  //     changeDepartmentColor();
  //     updateProgressBars();
  //     updateProgressReport();
  // } else {
  if (searchTask()) {
      filterAllTasks();
  }
  await loadUserTasksFromBackend();
  changeDepartmentColor();
  generateTemplate();
  updateProgressBars();
  updateProgressReport();
  // }
}

function filterTasks(array, id) {
  let filter = array.filter((t) => t["category"] == id);
  document.getElementById(id).innerHTML = "";
  for (let i = 0; i < filter.length; i++) {
    const task = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(task);
    // debugger;
    for (let j = 0; j < task["assignedTo"].length; j++) {
      const assignedContacts = task["assignedTo"][j];
      if (j > 2) {
        document.getElementById(`task-contacts-container${task["id"]}`).lastElementChild.innerHTML =
          generateAssignedContactsMoreThanFourHTML(task["assignedTo"]);
      } else {
        document.getElementById(`task-contacts-container${task["id"]}`).innerHTML += generateAssignedContactsHTML(
          getInitials(assignedContacts)
        );
      }
    }
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
  let filter = array.filter(
    (t) =>
      (t["category"] == id && t["headline"].toLowerCase().match(search)) ||
      (t["category"] == id && t["description"].toLowerCase().match(search))
  );
  for (let i = 0; i < filter.length; i++) {
    const element = filter[i];
    document.getElementById(id).innerHTML += generateTodoHTML(element);
  }
}

function generateTodoHTML(task) {
  return `
    <div id="${task["id"]}" draggable="true" ondragstart="startDragging(${task["id"]}); rotateTask(); highlight()" onclick="openAddTaskDialog('task-overlay', 'task-modal', ${task["id"]})" class="board-task">
        <span class="department">${task["department"]}</span>
        <span class="task-headline">${task["headline"]}</span>
        <span class="task-description">${task["description"]}</span>
        <div class="progress-container">
            <div class="progress" style="height: 8px;">
                <div class="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span><span class="progress-report">0</span>/3 Done</span>
        </div>
        <div class="contact-and-urgency">
            <div class="task-contacts-container" id="task-contacts-container${task["id"]}">
            </div>
            <div class="task-urgency">
                <img src="../img/priority-${task["priority"]}-icon.png" alt="urgency">
            </div>
        </div>
    </div>
    `;
}

function generateAssignedContactsHTML(contact) {
  return `
        <div class="task-contacts">${contact}</div>
    `;
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

function moveTo(category) {
  tasks[currentDraggedElement]["category"] = category; // z.b. Todo mit id 1: Das Feld 'category' ändert sich zu 'open' oder 'closed'
  document.getElementById("search").value = "";
  updateHTML();
}

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
    if (id2 == "task-modal") {
      document.getElementById("task-modal").innerHTML = generateTaskModalHTML(tasks[taskID]);
      // debugger;
      for (let i = 0; i < tasks[taskID]["assignedTo"].length; i++) {
        const contacts = tasks[taskID]["assignedTo"][i];
        document.getElementById(`assigned-contacts${taskID}`).innerHTML += generateTaskModalContactsHTML(
          getInitials(contacts),
          contacts
        );
      }
      changeDepartmentColor();
      document.getElementById(id2).classList.add("slide-in-bottom");
    } else {
      document.getElementById(id2).classList.add("slide-in");
    }
    document.body.style.overflow = "hidden";
  }, 10);
}

function closeAddTaskDialog(id, id2) {
  if (id == "task-modal") {
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

function generateTaskModalHTML(task) {
  return `
        <div class="task-modal-container">
                    <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                        onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                    <span class="department department-overlay">${task["department"]}</span>
                    <h3 class="task-headline-overlay">${task["headline"]}</h3>
                    <span class="task-description-overlay">${task["description"]}</span>
                    <div class="due-date-container">
                        <span>Due date:</span>
                        <span>${task["dueDate"]}</span>
                    </div>
                    <div class="prio-container">
                        <span>Priority:</span>
                        <img src="../img/prio-overlay-${task["priority"]}.png" alt="prio-overlay">
                    </div>
                    <div class="assigned-to-container">
                        <span>Assigned To:</span>
                        <div class="assigned-contacts" id="assigned-contacts${task["id"]}">  
                        </div>
                    </div>
                    <div class="edit-btn" onclick="editTasks(${task["id"]})"></div>
                </div>
    `;
}

function generateTaskModalContactsHTML(contactInitials, contact) {
  return `
        <div class="assigned-contact-row">
            <div class="task-contacts-overlay">${contactInitials}</div>
            <span>${contact}</span>
        </div>
    `;
}

function editTasks(taskID) {
  document.getElementById("task-modal").innerHTML = generateEditTaskHTML(tasks[taskID]);
  updateUrgencyBtns(taskID);
}

function updateUrgencyBtns(taskID) {
  // debugger;
  document.querySelectorAll('input[name="prio-edit"]').forEach((btn) => {
    if (btn.value == tasks[taskID]["priority"]) {
      btn.checked = true;
    }
  });
  // console.log(document.querySelectorAll('input[name="prio"]'))
}

function generateEditTaskHTML(task) {
  return `
    <div class="task-modal-container">
                    <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                        onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                        <form class="edit-task">
                        <div class="form-width input-title margin-btn-25">
                            <input id="edit-headline${task["id"]}" class="add-title input-title-font" type="text" placeholder="Enter a title" value="${task["headline"]}">
                        </div>
                        <div class="description-area description-area-overlay flex-column margin-btn-45">
                            <span class="category-header">Description</span>
                            <textarea class="" name="" id="edit-description${task["id"]}" cols="30" rows="10"
                                placeholder="Enter a Description">${task["description"]}</textarea>
                        </div>
                        <div class="date-area flex-column margin-btn-45">
                            <span class="category-header">Due date</span>
                            <input id="edit-date${task["id"]}" class="uniform-sizing date" type="date" value="${task["dueDate"]}">
                        </div>
                        <div class="button-area margin-btn-56">
                            <button type="button" value="high" class="add-task-prio-high" id="edit-high" onclick="checkButton('edit-high')" onmouseover="hoverButton('edit-high')" onmouseleave="leaveHoverButton('edit-high')">
                            <input type="radio" id="edit-high-prio" name="prio-edit" value="high">
                            <label for="edit-high-prio">
                                <span class="priority-button-text text-19pt">Urgent</span>
                                <img src="../img/prio_bnt_urgent.png" alt="">
                            </label>
                            </button>
                            <button type="button" value="medium" class="add-task-prio-medium" id="edit-medium" onclick="checkButton('edit-medium')" onmouseover="hoverButton('edit-medium')" onmouseleave="leaveHoverButton('edit-medium')">
                                <input type="radio" id="edit-medium-prio" name="prio-edit" value="medium">
                                <label for="edit-medium-prio">
                                    <span class="priority-button-text text-19pt">Medium</span>
                                    <img src="../img/prio_bnt_medium.png" alt="">
                                </label>
                            </button>
                            <button type="button" value="low" class="add-task-prio-low" id="edit-low" onclick="checkButton('edit-low')" onmouseover="hoverButton('edit-low')" onmouseleave="leaveHoverButton('edit-low')">
                                <input type="radio" id="edit-low-prio" name="prio-edit" value="low">
                                <label for="edit-low-prio">
                                    <span class="priority-button-text text-19pt">Low</span>
                                    <img src="../img/prio_bnt_low.png" alt="">
                                </label>
                            </button>
                        </div>
                        <div class="uniform-sizing text-19pt dropdown" role="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
                            <span>Select contacts to assign</span>
                            <img src="../img/select-arrow.png" alt="">
                        </div>
                        <div class="subtasks-input-area d-none" id="contact-input-area-edit">
                            <input class="" type="email" placeholder="Contact email" id="contact-input-edit" required>
                            <div class="subtask-icons">
                                <img onclick="closeContactInput('contact-input-area-edit', 'contact-dropdown-edit', 'contact-input-edit')" class="cursor-pointer"
                                    src="../img/cancel-subtask.png" alt="">
                                <img src="../img/subtask-line.png" alt="">
                                <img onclick="addContact()" class="cursor-pointer" src="../img/check-subtask.png"
                                    alt="">
                            </div>
                        </div>
                        <div class="margin-btn-25 assign-contact-container" id="contact-container-edit">
                            <div class="dropdown-contacts-container collapse scroll" id="collapseContactsEdit">


                                <div class="dropdown-contact">
                                    <label for="you">${activeUser["userName"]}</label>
                                    <input type="checkbox" id="you" name="assign-contacts">
                                </div>
                                <div class="dropdown-contact">
                                    <label for="schönfeld">Alexander Schönfeld</label>
                                    <input type="checkbox" id="schönfeld" name="assign-contacts" value="Alexander Schönfeld">
                                </div>
                                <div class="dropdown-contact">
                                    <label for="zediu">Corneliu Zediu</label>
                                    <input type="checkbox" id="zediu" name="assign-contacts" value="Corneliu Zediu">
                                </div>
                                <div class="dropdown-contact">
                                    <label for="savkovic">Danijel Savkovic</label>
                                    <input type="checkbox" id="savkovic" name="assign-contacts" value="Danijel Savkovic">
                                </div>



                                <div class="dropdown-contact" onclick="openContactInput('contact-dropdown-edit', 'contact-input-area-edit', 'contact-input-edit')" role="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
                                    <label for="">Invite new contact</label>
                                    <img src="../img/new-contact-icon.png" alt="">
                                </div>
                            </div>
                        </div>
                    </form>
                    <button class="btn-add-task ok-btn" onclick="saveTasks(${task["id"]})">
                        Ok
                        <img src="../img/check-icon.png" alt="add-icon">
                    </button>
                </div>
    `;
}

async function saveTasks(taskID) {
  let editHeadline = document.getElementById(`edit-headline${taskID}`).value;
  let editDescription = document.getElementById(`edit-description${taskID}`).value;
  let editDate = document.getElementById(`edit-date${taskID}`).value;
  document.querySelectorAll('input[name="prio-edit"]').forEach((check) => {
    if (check.checked) {
      tasks[taskID]["priority"] = check.value;
    }
  });
  tasks[taskID]["headline"] = editHeadline;
  tasks[taskID]["description"] = editDescription;
  tasks[taskID]["dueDate"] = editDate;
  closeAddTaskDialog("task-modal", "task-overlay");
  await updateHTML();
}

function hoverButton(id) {
  // debugger;
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


function createSubtaskHTML(subtask) {
  return `
    <div class="subtask">
        <input type="checkbox">
        <label class="" for="ckeck">${subtask}</label>
    </div>
    `;
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

function createContactHTML() {
  return `
    <div class="task-contacts-overlay-container">
        <div class="task-contacts-overlay font-size21">SM</div>
        <div class="task-contacts-overlay font-size21">MV</div>
        <div class="task-contacts-overlay font-size21">EF</div>
    </div>
    `;
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

  console.log(contactsCheckedBoxes);

  if (contactsCheckedBoxes == null) {
    let validation = document.getElementById("title");
    validation.setCustomValidity("Must set at least one contact");
    validation.reportValidity();
    return;
  }

  let date = document.getElementById("date").value;
  // let category =
  let urgency = document.querySelector('input[name="prio"]:checked').value;
  let description = document.getElementById("description-text").value;
  new CreateTask(tasks.length, title, description, contactsCheckedBoxes, urgency, date);
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
