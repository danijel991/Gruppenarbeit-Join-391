// gruppe-391.developerakademie.net/smallest_backend_ever/nocors.php
// setURL('https://developerakademie.net/smallest_backend_ever');



/***    Variable    ***/



/***    Array       ***/
let usersArray = [];
let activeUser = [];
let activeUserContacts = [];

/***    Functions   ***/
async function startPage() {
    await loadUsersFromBackend();
    await ifSomethingLocal();
}


async function init() {
    getLocalActiveUser()
    await includeHTML();
    await showSelectedLink();
    await loadUsersFromBackend();
    await loadUserContactsFromBackend()
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

// Local Storage & Active user
function saveLocalActiveUser(activeUser) {
    let stringStorage = JSON.stringify(activeUser);
    localStorage.setItem('activeUser', stringStorage);
}


function getLocalActiveUser() {
    let stringStorage = localStorage.getItem('activeUser');
    activeUser = JSON.parse(stringStorage);
}


async function ifSomethingLocal() {
    if (localStorage.getItem("activeUser") !== null) {
        getLocalActiveUser();
        let logIn = await checkIfQuickAcces();
        if( logIn === true){
            logInActiveUser();
        }
    }
}


async function checkIfQuickAcces() {
    goLogIn = activeUser['quickAcces'];
    return goLogIn;
}

// Backend functions    
async function loadUsersFromBackend() {
    await downloadFromServer();
    usersArray = JSON.parse(backend.getItem('usersArray')) || [];
}

async function saveInBackend() {
    await backend.setItem('usersArray', JSON.stringify(usersArray));
}

async function saveInBackendUserContacts() {
    activeUserEmail = activeUser['userEmail'];
    await backend.setItem(`${activeUserEmail}`, JSON.stringify(activeUserContacts));
}

async function loadUserContactsFromBackend() {
    activeUserEmail = activeUser['userEmail'];
    await downloadFromServer();
    activeUserContacts = JSON.parse(backend.getItem(`${activeUserEmail}`)) || [];
}

function deleteUserContacts() {
    document.getElementById('delete-contact-button').classList.add('d-none');
    document.getElementById('delete-contact-button-alert').classList.remove('d-none');  
}

function abortDeleteContacts() {
    document.getElementById('delete-contact-button').classList.remove('d-none');
    document.getElementById('delete-contact-button-alert').classList.add('d-none');
}

async function executeDeleteContacts() {
    document.getElementById('delete-contact-button-alert').classList.add('d-none');

    await backend.deleteItem(`${activeUserEmail}`);
    activeUserContacts = [];
    document.getElementById('contact-list').innerHTML = '';
    document.getElementById('contact-detail').innerHTML = '';
    console.log("Deleted all contacts of: ", activeUserEmail);
}
    
    async function saveInBackendUserTasks(index) {
        activeUserEmail = activeUser['userEmail'];
        await backend.setItem(`${activeUserEmail}_task${index}`, JSON.stringify(activeUserContacts));
    }


/***    Log In  &  Log Out  ***/

async function logInUser() {
    let emailUser = document.getElementById("email").value;
    let passwordUser = document.getElementById("password").value;
    validatedInput(emailUser, passwordUser);
    let acces = await checkIfExists(emailUser, passwordUser);
    goToSummary(acces);
    emailUser.value = "";
    passwordUser = "";
}


async function logOut() {
    activeUser["quickAcces"] = false;
    await saveLocalActiveUser(activeUser);
    toLogInPage();
}