/***    Array       ***/
let usersArray = [];      // Array that holds the user list from the backend;
let activeUser = [];      // Array that holds the actiov user info;
let activeUserContacts = [];  // Array that holds the contacts of the active user;

/***    Functions   ***/

/**
 * After openning the page, calls the functions that animate the LOGO;
 * 
 */
async function logoAnimation() {
  transitionLogo();
  setTimeout(changeBg, 350);
  setTimeout(showCardAndHeader, 400);
  await loadUsersFromBackend();

}


/**
 * After Log In, the function is collectiong a serial if data throw the corresponding functions
 */
async function init() {
  await loadUsersFromBackend();
  await getActiveUser();
  await includeHTML();
  await showSelectedLink();
  await loadUserContactsFromBackend();
  await loadUserTasksFromBackend();
}


/**
 * The function provides the HTML Template.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute".
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


// Local Storage & Active user.
/**
 * The functions does save the Active User in Local Storage.
 * 
 * @param {object} activeUser - The Object contains the informations of the active user.
 */
async function saveLocalActiveUser(activeUser) {
  let stringStorage = await JSON.stringify(activeUser);
  localStorage.setItem("activeUser", stringStorage);
}


/**
 * The functions is deleting the Active User in Local Storage.
 * 
 * @param {*} activeUser - The Object contains the informations of the active user.
 */
async function deleteLocalActiveUser(activeUser) {
  window.localStorage.clear();
  activeUser = [];
}


/**
 * The function is cheking is the user was already register throw Local Storage.
 * If user was already registered, the data of active user are collected from the Local Storage, otherwise from the URL.
 */
async function getActiveUser() {
  if (localStorage.getItem("activeUser") !== null) {
    let stringStorage = localStorage.getItem("activeUser");
    activeUser = await JSON.parse(stringStorage);
  } else if (localStorage.getItem("activeUser") === null) {
    console.log("No Local Storage");
    setActiveUser(collectActiveUserFromURL())
  }
}


/**
 * The functions is collecting the active user email from the UR.
 * 
 * @returns - the email of the active user.
 */
function collectActiveUserFromURL() {
  var params = new URLSearchParams(window.location.search);
  var first = params.get("first");
  var userEmail = JSON.parse(params.get("second"));
  return userEmail;
}


/**
 * The functions provides the info if the user is allowed to Log In automatically, by comming back on the page.
 * 
 * @returns - True or False.
 */
async function checkIfQuickAcces() {
  goLogIn = activeUser["quickAcces"];
  return goLogIn;
}


//////////////// Backend functions /////////////
/**
 * The function is provideing the Users Data from the server.
 */
async function loadUsersFromBackend() {
  await downloadFromServer();
  usersArray = JSON.parse(backend.getItem("usersArray")) || [];
}


/**
 * The function is saveing the Users Data in server.
 */
async function saveInBackend() {
  await backend.setItem("usersArray", JSON.stringify(usersArray));
}


///////// Backend Contacts
/**
 * function saves all specific contacts of active user in Backend under the key 'activeUserEmail'
 */
async function saveInBackendUserContacts() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}`, JSON.stringify(activeUserContacts));
}

/**
 * function loads all spedific contacts of active user from Backend
 */
async function loadUserContactsFromBackend() {
  activeUserEmail = activeUser["userEmail"];
  await downloadFromServer();
  activeUserContacts = JSON.parse(backend.getItem(`${activeUserEmail}`)) || [];
}

/**
 * function displays red alert button before final deletion of all active user contacts in Backend 
 */
function deleteUserContacts() {
  document.getElementById("delete-contact-button").classList.add("d-none");
  document.getElementById("delete-contact-button-alert").classList.remove("d-none");
}

/**
 * function aborts deletion
 */
function abortDeleteContacts() {
  document.getElementById("delete-contact-button").classList.remove("d-none");
  document.getElementById("delete-contact-button-alert").classList.add("d-none");
}

/**
 * function deletes all specific active user contacts in Backend, which are save under this key 'activeUserEmail'
 */
async function executeDeleteContacts() {
  document.getElementById("delete-contact-button-alert").classList.add("d-none");

  await backend.deleteItem(`${activeUserEmail}`);
  activeUserContacts = [];
  document.getElementById("contact-list").innerHTML = "";
  document.getElementById("contact-detail").innerHTML = "";
  console.log("Deleted all contacts of: ", activeUserEmail);
}

//// BACKEND Tasks
/**
 * function saves all tasks of active user in Backend under this key 'activeUserEmail_task'
 */
async function saveInBackendUserTasks() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}_task`, JSON.stringify(tasks));
}

/**
 * function loads all active user tasks from Backend
 */
async function loadUserTasksFromBackend() {
  activeUserTasks = `${activeUser["userEmail"]}_task`;
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem(activeUserTasks)) || [];
}

// diese Variante nur nehmen, wenn jeder Task einzeiln im Backend gespeichert werden soll
// async function saveInBackendUserTasks(index) {
//   activeUserEmail = activeUser["userEmail"];
//   await backend.setItem(`${activeUserEmail}_task${index}`, JSON.stringify(tasks));
// }


/***    Log In  &  Log Out  ***/
/**
 * The function does the procceses for the Log In. 
 */
async function logInUser() {
  let emailUser = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;
  validatedInput(emailUser, passwordUser);
  let acces = await checkIfExists(emailUser, passwordUser);
  console.log("Log In Before:", activeUser);
  await checkIfRmemberMe(emailUser);
  goToSummary(acces, emailUser); // goes to login-register.js line 154 to pass email with url
  console.log("Log In After:", activeUser);
  emailUser.value = "";
  passwordUser = "";
}


/**
 * The function does the procceses for the Log Out. 
 */
async function logOut() {
  activeUser["quickAcces"] = false;
  if (localStorage.getItem("activeUser") !== null) {
    await saveLocalActiveUser(activeUser);
  }
  toLogInPage();
}


/**
 * The funtion is checking if the user decided to Log In automatically on comming back on the page.
 * 
 * @param {*} emailUser 
 */
async function checkIfRmemberMe(emailUser) {
  let checkbox = callCheckBox();
  if (checkbox == true) {
    await setActiveUser(emailUser) // goes to line 91,  stores actual user in active user variable
  } else {
    await deleteLocalActiveUser(activeUser);
  }
} 
