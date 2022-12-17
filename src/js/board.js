let currentDraggedElement;

const color = {
    design: '#FF7A00',
    sales: '#FC71FF',
    backoffice: '#1FD7C1',
    marketing: '#0038FF',
    media: '#FFC701'
}

let tasks = [
    {
        id: 0,
        department: 'Design',
        headline: 'Website redesign',
        description: 'Modify the contents of the main website..',
        assignedTo: [],
        priority: 'low',
        category: 'to-do',
        dueDate: '2022-08-05'
    },
    {
        id: 1,
        department: 'Sales',
        headline: 'Call potencial clients',
        description: 'Make the product presentation to prospective buyers',
        assignedTo: [],
        priority: 'high',
        category: 'in-progress',
        dueDate: '2022-08-05'
    },
    {
        id: 2,
        department: 'Backoffice',
        headline: 'Accounting invoices',
        description: 'Write open invoices for customer',
        assignedTo: [],
        priority: 'medium',
        category: 'await-feedback',
        dueDate: '2022-08-05'
    },
    {
        id: 3,
        department: 'Media',
        headline: 'Video cut',
        description: 'Edit the new company video',
        assignedTo: [],
        priority: 'medium',
        category: 'await-feedback',
        dueDate: '2022-08-05'
    },
    {
        id: 4,
        department: 'Marketing',
        headline: 'Social media strategy',
        description: 'Develop an ad campaign for brand positioning',
        assignedTo: [],
        priority: 'low',
        category: 'done',
        dueDate: '2022-08-05'
    }
];


function changeDepartmentColor() {
    let departmentColor;
    document.querySelectorAll('.department').forEach(department => {    // searches through all classes with the name of department and is iterating through nodelist
        departmentColor = department.innerHTML.toLowerCase();           // saves value(text) from span in variable
        department.style.backgroundColor = color[departmentColor];      // sets the background color to the correct value
    });
}


function updateHTML() {
    let toDo = tasks.filter(t => t['category'] == 'to-do');

    document.getElementById('to-do').innerHTML = '';

    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('to-do').innerHTML += generateTodoHTML(element);
    }

    let inProgress = tasks.filter(t => t['category'] == 'in-progress');

    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    }

    let awaitFeedback = tasks.filter(t => t['category'] == 'await-feedback');

    document.getElementById('await-feedback').innerHTML = '';

    for (let i = 0; i < awaitFeedback.length; i++) {
        const element = awaitFeedback[i];
        document.getElementById('await-feedback').innerHTML += generateTodoHTML(element);
    }

    let done = tasks.filter(t => t['category'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
    changeDepartmentColor();
    generateTemplate();
    updateProgressBars();
    updateProgressReport();
}


function generateTodoHTML(task) {
    return `
    <div id="${task['id']}" draggable="true" ondragstart="startDragging(${task['id']}); rotateTask(); highlight()" onclick="openAddTaskDialog('task-overlay', 'task-modal', ${task['id']})" class="board-task">
        <span class="department">${task['department']}</span>
        <span class="task-headline">${task['headline']}</span>
        <span class="task-description">${task['description']}</span>
        <div class="progress-container">
            <div class="progress" style="height: 8px;">
                <div class="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span><span class="progress-report">0</span>/3 Done</span>
        </div>
        <div class="contact-and-urgency">
            <div class="task-contacts-container">
                <div class="task-contacts">SM</div>
                <div class="task-contacts pink">MV</div>
                <div class="task-contacts green">EF</div>
            </div>
            <div class="task-urgency">
                <img src="../img/priority-${task['priority']}-icon.png" alt="urgency">
            </div>
        </div>
    </div>
    `;
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category; // z.b. Todo mit id 1: Das Feld 'category' ändert sich zu 'open' oder 'closed'
    updateHTML();
}


function highlight() {
    document.querySelectorAll('.template-task').forEach(template => {
        template.classList.add('drag-area-highlight');
    });
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function rotateTask() {
    document.getElementById(currentDraggedElement).classList.add('rotate');
}


function markAddIconAsActive(i) {
    let addIcon = document.getElementById(`add-icon${i}`);
    addIcon.style.backgroundImage = 'url("../img/plus-button-inactive.png")';
    addIcon.style.transition = 'all 125ms ease-in-out';
}


function resetAddIcon() {
    document.querySelectorAll('.add-icon').forEach(add => {
        add.style.backgroundImage = 'url("../img/plus-button.png")';
        add.style.transition = 'all 125ms ease-in-out';
    });
}


// addEventListener('dragstart', () => {
//     generateTemplate();
// })


function generateTemplate() {
    document.getElementById('to-do').innerHTML += templateTask(0);
    document.getElementById('in-progress').innerHTML += templateTask(1);
    document.getElementById('await-feedback').innerHTML += templateTask(2);
    document.getElementById('done').innerHTML += templateTask(3);
}


function templateTask(i) {
    return `<div id="template${i}" class="template-task"><div>`;
}


function openAddTaskDialog(id, id2, taskID) {
    document.getElementById(id).classList.remove("d-none");
    // debugger;
    setTimeout(() => {
        if (id2 == 'task-modal') {
            document.getElementById('task-modal').innerHTML = generateTaskModalHTML(tasks[taskID]);
            changeDepartmentColor();
            document.getElementById(id2).classList.add("slide-in-bottom");
        } else {
            document.getElementById(id2).classList.add("slide-in");
        }
        document.body.style.overflow = 'hidden';
    }, 10);
}


function closeAddTaskDialog(id, id2) {
    if (id == 'task-modal') {
        document.getElementById(id).classList.remove("slide-in-bottom");
    } else {
        document.getElementById(id).classList.remove("slide-in");
    }
    setTimeout(() => {
        document.getElementById(id2).classList.add("d-none");
        document.body.style.overflow = 'unset';
        resetAddIcon();
    }, 200);
}


function updateProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(e => {
        if (boardTaskContainerId(e) == 'to-do') {
            e.style.width = 0;
        } else if (boardTaskContainerId(e) == 'in-progress') {
            e.style.width = 33 + "%";
        } else if (boardTaskContainerId(e) == 'await-feedback') {
            e.style.width = 66 + "%";
        } else if (boardTaskContainerId(e) == 'done') {
            e.style.width = 100 + "%";
        }
    })
}


function updateProgressReport() {
    document.querySelectorAll('.progress-report').forEach(e => {
        if (boardTaskContainerId(e) == 'to-do') {
            e.innerHTML = 0;
        } else if (boardTaskContainerId(e) == 'in-progress') {
            e.innerHTML = 1;
        } else if (boardTaskContainerId(e) == 'await-feedback') {
            e.innerHTML = 2;
        } else if (boardTaskContainerId(e) == 'done') {
            e.innerHTML = 3;
        }
    })
}


function boardTaskContainerId(e) {
    return e.parentElement.parentElement.parentElement.parentElement.id;  // Id from to-do, in-progress etc. containers
}


function generateTaskModalHTML(task) {
    return `
        <div class="task-modal-container">
                    <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                        onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                    <span class="department department-overlay">${task['department']}</span>
                    <h3 class="task-headline-overlay">${task['headline']}</h3>
                    <span class="task-description-overlay">${task['description']}</span>
                    <div class="due-date-container">
                        <span>Due date:</span>
                        <span>${task['dueDate']}</span>
                    </div>
                    <div class="prio-container">
                        <span>Priority:</span>
                        <img src="../img/prio-overlay-${task['priority']}.png" alt="prio-overlay">
                    </div>
                    <div class="assigned-to-container">
                        <span>Assigned To:</span>
                        <div class="assigned-contacts">
                            <div class="assigned-contact-row">
                                <div class="task-contacts-overlay">SM</div>
                                <span>Stefan Meier</span>
                            </div>
                            <div class="assigned-contact-row">
                                <div class="task-contacts-overlay pink">MV</div>
                                <span>Marvin Vogel</span>
                            </div>
                            <div class="assigned-contact-row">
                                <div class="task-contacts-overlay green">EF</div>
                                <span>Elisabeth Friedrich</span>
                            </div>
                        </div>
                    </div>
                    <div class="edit-btn" onclick="editTasks(${task['id']})"></div>
                </div>
    `;
}


function editTasks(taskID) {
    document.getElementById('task-modal').innerHTML = generateEditTaskHTML(tasks[taskID]);
}


function generateEditTaskHTML(task) {
    return `
    <div class="task-modal-container">
                    <img class="close-icon-overlay" src="../img/add-task-close-icon.png"
                        onclick="closeAddTaskDialog('task-modal', 'task-overlay')">
                        <form class="edit-task">
                        <div class="form-width input-title margin-btn-25">
                            <input id="edit-headline${task['id']}" class="add-title input-title-font" type="text" placeholder="Enter a title" value="${task['headline']}">
                        </div>
                        <div class="description-area description-area-overlay flex-column margin-btn-45">
                            <span class="category-header">Description</span>
                            <textarea class="" name="" id="edit-description${task['id']}" cols="30" rows="10"
                                placeholder="Enter a Description">${task['description']}</textarea>
                        </div>
                        <div class="date-area flex-column margin-btn-45">
                            <span class="category-header">Due date</span>
                            <input id="edit-date${task['id']}" class="uniform-sizing date" type="date" value="${task['dueDate']}">
                        </div>
                        <div class="button-area margin-btn-56">
                            <button class="add-task-prio-high">
                                <span class="priority-button-text text-19pt">Urgent</span>
                                <img src="../img/prio_bnt_urgent.png" alt="">
                            </button>
                            <button class="add-task-prio-medium">
                                <span class="priority-button-text text-19pt">Medium</span>
                                <img src="../img/prio_bnt_medium.png" alt="">
                            </button>
                            <button class="add-task-prio-low">
                                <span class="priority-button-text text-19pt">Low</span>
                                <img src="../img/prio_bnt_low.png" alt="">
                            </button>
                        </div>
                        <div class="assigned-to-area margin-btn-25">
                            <span class="category-header">Assigned To:</span>
                            <select class="uniform-sizing text-19pt" name="" id="">
                                <option value="">Select contacts to assign</option>
                            </select>
                            <div class="task-contacts-overlay-container">
                                <div class="task-contacts-overlay font-size21">SM</div>
                                <div class="task-contacts-overlay font-size21">MV</div>
                                <div class="task-contacts-overlay font-size21">EF</div>
                            </div>
                        </div>
                    </form>
                    <button class="btn-add-task ok-btn" onclick="saveTasks(${task['id']})">
                        Ok
                        <img src="../img/check-icon.png" alt="add-icon">
                    </button>
                </div>
    `;
}


function saveTasks(taskID) {
    let editHeadline = document.getElementById(`edit-headline${taskID}`).value;
    let editDescription = document.getElementById(`edit-description${taskID}`).value;
    let editDate = document.getElementById(`edit-date${taskID}`).value;
    tasks[taskID]['headline'] = editHeadline;
    tasks[taskID]['description'] = editDescription;
    tasks[taskID]['dueDate'] = editDate;
    closeAddTaskDialog('task-modal', 'task-overlay');
    updateHTML();
}


function hoverButton(id) {
    // debugger;
    let hover = document.getElementById(id);
    if (!hover.firstElementChild.checked) {
        if (id == 'high') {
            hover.classList.add('btn-high-hover');
        } else if (id == 'medium') {
            hover.classList.add('btn-medium-hover');
        } else if (id == 'low') {
            hover.classList.add('btn-low-hover');
        }
    }
}


function leaveHoverButton(id) {
    let hover = document.getElementById(id);
    if (id == 'high') {
        hover.classList.remove('btn-high-hover');
    } else if (id == 'medium') {
        hover.classList.remove('btn-medium-hover');
    } else if (id == 'low') {
        hover.classList.remove('btn-low-hover');
    }
}


function checkButton(id) {
    // debugger;
    let button = document.getElementById(id);
    button.firstElementChild.checked = true;
}


// function uncheckButton(id) {
//     let button = document.getElementById(id);
//     button.addEventListener("click", () => {
//         timesClicked++;
//         if (timesClicked % 2 == 0) {
//             button.firstElementChild.checked = false;
//         } else {
//             button.firstElementChild.checked = true;
//         }
//     })
//     console.log(timesClicked);
// }


// function showActiveButton(id) {
//     // debugger;
//     let active = document.getElementById(id);
//     if (id == 'high') {
//         active.style.backgroundColor = '#FF3D00';
//         active.lastElementChild.src = '../img/prio-high-active.png';
//     } else if (id == 'medium') {
//         active.style.backgroundColor = '#FFA800';
//         active.lastElementChild.src = '../img/prio-medium-active.png';
//     } else if (id == 'low') {
//         active.style.backgroundColor = '#7AE229';
//         active.lastElementChild.src = '../img/prio-low-active.png';
//     }
//     active.firstElementChild.style.color = 'white';
// }