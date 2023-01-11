
/*// HTML RENDERING & ANIMATION ////////////////////////////////*/

function openContactDetail(index) {
    setTimeout(() => {
      document.getElementById("contact-detail").classList.remove("slide-in");
    }, 20);
  
    let content = document.getElementById("contact-detail");
    let { name, initials, initialsColor, email, phone } = getContactDetails(index);
  
    content.innerHTML = "";
    content.innerHTML = generateContactDetail(index, name, initials, initialsColor, email, phone);
    setTimeout(() => {
      document.getElementById("contact-detail").classList.add("slide-in");
    }, 200);
  
  }
  
  function showDeleteButton() {
    if (getEmails()) {
      document.getElementById("delete-contact-button").classList.remove("d-none");
    } else {
      document.getElementById("delete-contact-button").classList.add("d-none");
    }
  }
  
  function slideOut(){
    document.getElementById("contact-detail").classList.remove("slide-in");
  }
  
  function renderContactList() {
    sortActiveUserContacts();
    let firstLetters = activeUserContacts.map((item) => item.initials[0]);
  
    let content = document.getElementById("contact-list");
    content.innerHTML = " ";
  
    for (let i = 0; i < activeUserContacts.length; i++) {
      renderRegistery(i, firstLetters);
      content.innerHTML += `
        <div class="contact-box" onclick="openContactDetail(${i})">
        <div class="letters" style="background-color: ${activeUserContacts[i]["initialsColor"]}">${activeUserContacts[i]["initials"]}</div>
        <div>
        <div>${activeUserContacts[i]["name"]}</div>
        <div>${activeUserContacts[i]["email"]}</div>
        <div>${activeUserContacts[i]["phone"]}</div>
        </div>
        </div>
        `;
    }
  }
  
  function renderRegistery(i, firstLetters) {
    if (firstLetters[i] == priorLetter) {
      return;
    } else {
      document.getElementById("contact-list").innerHTML += `
    <div class="contact-registery">${firstLetters[i]}
    `;
      priorLetter = firstLetters[i];
    }
  }
  
  function openAddContactDialog() {
    clearContent();
  
    setTimeout(() => {
      document.getElementById("add-contact-modal").classList.add("slide-in");
    }, 10);
  }
  
  function closeAddContactDialog() {
    document.getElementById("add-contact-modal").classList.remove("slide-in");
  
    setTimeout(() => {
      document.getElementById("overlay").classList.add("d-none");
    }, 200);
  }
  
  function clearContent() {
    document.getElementById("overlay").classList.remove("d-none");
    document.getElementById("info-text").classList.remove("info-text-alert");
    document.getElementById("info-text").classList.add("info-text");
    document.getElementById("info-text").innerHTML = "Tasks are better with a team!";
    document.getElementById("new-contact-name").value = "";
    document.getElementById("new-contact-email").value = "";
    document.getElementById("new-contact-phone").value = "";
    document.getElementById("new-contact-email").style.color = "black";
  }
  
  function openEditContactDialog(index) {
    document.getElementById("overlay2").classList.remove("d-none");
  
    let { name, initials, initialsColor, email, phone } = getContactDetails(index);
  
    let content = document.getElementById("edit-contact-modal");
  
    content.innerHTML = generateContactEditDialog(index);
    document.getElementById("edit-contact-name").value = `${name}`;
    document.getElementById("edit-contact-email").value = `${email}`;
    document.getElementById("edit-contact-phone").value = `${phone}`;
  
    animateEditDialog();
  }
  
  function animateEditDialog() {
    setTimeout(() => {
      document.getElementById("edit-contact-modal").classList.add("slide-in");
    }, 10);
  }
  
  function closeEditContactDialog() {
    document.getElementById("edit-contact-modal").classList.remove("slide-in");
  
    setTimeout(() => {
      document.getElementById("overlay2").classList.add("d-none");
    }, 200);
  }
  
  function generateContactEditDialog(index) {
    return `
  <div class="contact-dialog-top">
                    <img class="close-icon" src="../img/close_icon.png" onclick="closeEditContactDialog()">
                    <img src="../img/join-logo.png">
                    <h2 class="contact-title" id="exampleModalLabel">Edit contact</h2>
  
                    <h4 id="info-text" class="info-text">Tasks are better with a team!</h4>
  
                </div>
                <div class="contact-dialog-bottom">
                    <div class="user-avatar"><img src="../img/user-avatar.png" alt=""></div>
                    <div class="form">
                        <form class="add-contact_form" onsubmit="updateUserContact(${index}); return false;">
                            <div class="add-contact-input-field">
                                <input id="edit-contact-name" class="contact-form-control contacts_input" type="text"
                                    placeholder="Name" required>
                                <img src="/src/img/input_name.png" alt="">
                            </div>
                            <div class="add-contact-input-field">
                                <input id="edit-contact-email" class="contact-form-control contacts_input " type="email"
                                    placeholder="Email" required>
                                <img src="/src/img/input_mail.png" alt="">
                            </div>
                            <div class="add-contact-input-field">
                                <input id="edit-contact-phone" class="contact-form-control contacts_input " type="number"
                                    pattern="" placeholder="Phone" required>
                                <img src="/src/img/phone_icon.png" alt="">
                            </div>
                            <div class="edit-contact-buttons">
                            <button type="submit" class="edit-contact-button" required>
                                <span>Save</span><img src="../img/addcontact.png">
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                `;
  }
  
  function generateContactDetail(index, name, initials, initialsColor, email, phone) {
    return `
    <div onclick="slideOut()" class="contact-detail-mobile" id="contact-detail-mobile"><img src="../img/arrow_forward.png" alt=""></div>
    <span class="span-display-none">Kanban Project Management Tool</span>
    <div class="contact-detail-header">
    <div class="letters-large" style="background-color: ${initialsColor}">${initials}
    </div>
    <div>
        <div class="contact-detail-header-right">
            <div class="contact-name">${name}</div>
            <div class="add-task-link"><img src="../img/plus_icon_small.png">Add Task</div>
        </div>
  
    </div>
    </div> 
  
  <div class="contact-body">
  
    <div class="contact-body-header">
        <div class="contact-information">Contact Information</div>
        <div class="edit-contact" onclick="openEditContactDialog(${index})"><img  onclick="openEditContactDialog()"src="../img/pencil_small.png">Edit Contact</div>
    </div>
    <div class="contact-detail-bold">Email</div>
    <div class="contact-detail-medium">${email}</div>
    <div class="contact-detail-bold">Phone</div>
    <div class="contact-detail-medium">${phone}</div>
    <div class="edit-contact-responsive" onclick="openEditContactDialog(${index})"><img  onclick="openEditContactDialog()"src="../img/edit_contact_responsive_icon.png"></div>
    </div>
  </div>
        `;
  }
  
/**
 * function gets arry activeUserContacts and renders drop-down in Add-Task Dialog
 */
function renderContactsInDropDown() {
    content = document.getElementById('collapseContacts');
    content.innerHTML = ' '; 
    for (let i = 0; i < activeUserContacts.length; i++) {
        let name = activeUserContacts[i]['name'];
        content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
    </div>`;
    };
}


function renderContactsInEditDropDown(taskID) {
    content = document.getElementById('collapseContactsEdit');
    content.innerHTML = ' '; 
    for (let i = 0; i < activeUserContacts.length; i++) {
      
        let name = activeUserContacts[i]['name'];
      if (assignedToContactTrue(taskID, name)) {
        content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" checked="checked" id="${name}" name="assign-contacts" value="${name}">
    </div>`;
      } else {
        content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
    </div>`;
        
      }
      
    };
}

function assignedToContactTrue(taskID, name) {
  let checkedNames = []; 
  for (let i = 0; i < tasks[taskID]['assignedTo'].length; i++) {
    checkedNames.push(tasks[taskID]['assignedTo'][i]);
  }
  if (checkedNames.includes(name)) {
    return true;    
  } else {
    return false;
  }
}

// return `
//     <div class="dropdown-contact">
//     <label for="you">${activeUser["userName"]}</label>
//     <input type="checkbox" id="you" name="assign-contacts">
// </div>
// <div class="dropdown-contact">
//     <label for="schönfeld">Alexander Schönfeld</label>
//     <input type="checkbox" id="schönfeld" name="assign-contacts" value="Alexander Schönfeld">
// </div>
// <div class="dropdown-contact">
//     <label for="zediu">Corneliu Zediu</label>
//     <input type="checkbox" id="zediu" name="assign-contacts" value="Corneliu Zediu">
// </div>
//  <div class="dropdown-contact">
//      <label for="savkovic">Danijel Savkovic</label>
//     <input type="checkbox" id="savkovic" name="assign-contacts" value="Danijel Savkovic">
//  </div>
//  `;


// content = document.getElementById('collapseContacts');
//     for (let i = 0; i < activeUserContacts.length; i++) {
//         let name = activeUserContacts[i]['name'];
//         let initials = activeUserContacts[i]['initials'];
//         let initialsColor = activeUserContacts[i]['initialsColor'];
//         return `
//         <div class="dropdown-contact">
//         <label for="you">${name}</label>
//         <input type="checkbox" id="you" name="assign-contacts">
//     </div>`;
//     };
