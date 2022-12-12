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
}


function generateTodoHTML(task) {
    return `
    <div id="${task['id']}" draggable="true" ondragstart="startDragging(${task['id']}); rotateTask()" class="board-task">
        <span class="department">${task['department']}</span>
        <span class="task-headline">${task['headline']}</span>
        <span class="task-description">${task['description']}</span>
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
    </div>`;
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


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function rotateTask() {
    document.getElementById(currentDraggedElement).classList.add('rotate');
}

