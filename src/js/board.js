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
        category: 'to-do'
    },
    {
        id: 1,
        department: 'Sales',
        headline: 'Call potencial clients',
        description: 'Make the product presentation to prospective buyers',
        assignedTo: [],
        priority: 'high',
        category: 'in-progress'
    },
    {
        id: 2,
        department: 'Backoffice',
        headline: 'Accounting invoices',
        description: 'Write open invoices for customer',
        assignedTo: [],
        priority: 'medium',
        category: 'await-feedback'
    },
    {
        id: 3,
        department: 'Media',
        headline: 'Video cut',
        description: 'Edit the new company',
        assignedTo: [],
        priority: 'medium',
        category: 'await-feedback'
    },
    {
        id: 4,
        department: 'Marketing',
        headline: 'Social media strategy',
        description: 'Develop an ad campaign for brand positioning',
        assignedTo: [],
        priority: 'low',
        category: 'done'
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
    // updateAllProgressBar();
    updateProgressBars();
    updateProgressReport();
}


function generateTodoHTML(task) {
    return `
    <div id="${task['id']}" draggable="true" ondragstart="startDragging(${task['id']}); rotateTask(); highlight()" class="board-task">
        <span class="department">${task['department']}</span>
        <span class="task-headline">${task['headline']}</span>
        <span class="task-description">${task['description']}</span>
        <div class="progress-container">
            <div class="progress" style="height: 8px;">
                <div class="progress-bar" id="progress-bar${task['id']}" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
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


function generateTemplate() {
    document.getElementById('to-do').innerHTML += templateTask(0);
    document.getElementById('in-progress').innerHTML += templateTask(1);
    document.getElementById('await-feedback').innerHTML += templateTask(2);
    document.getElementById('done').innerHTML += templateTask(3);
}


function templateTask(i) {
    return `<div id="template${i}" class="template-task"><div>`;
}


function openAddTaskDialog() {
    document.getElementById("add-task-overlay").classList.remove("d-none");

    setTimeout(() => {
        document.getElementById("add-task-modal").classList.add("slide-in");
        document.body.style.overflow = 'hidden';
    }, 10);
}


function closeAddTaskDialog() {
    document.getElementById("add-task-modal").classList.remove("slide-in");

    setTimeout(() => {
        document.getElementById("add-task-overlay").classList.add("d-none");
        document.body.style.overflow = 'unset';
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


// function updateAllProgressBar() {
//     updateProgressBars('to-do', 'progress0');
//     updateProgressBars('in-progress', 'progress33');
//     updateProgressBars('await-feedback', 'progress66');
//     updateProgressBars('done', 'progress100');
// }


// function updateProgressBars(id, classname) {
//     let parent = document.getElementById(id).querySelectorAll('.progress-bar');
//     console.log(parent[0].classList.add(classname));
// }