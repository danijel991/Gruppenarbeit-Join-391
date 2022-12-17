let contact = [];

async function loadAllContacts() {
  await init();
  renderContactList();
}

function getContactDetails(index) {
  contact = activeUserContacts[index];
  return contact; // return contact here as a whole object and deconstruct it, where you receive it
}

/*// ADD NEW CONTACT ////////////////////////////////*/
async function addNewUserContact() {
  let newContact = getContactInfo();

  activeUserContacts.push(newContact);
  document.getElementById('delete-contact-button').classList.remove('d-none');
  
  await saveInBackendUserContacts();
  await loadAllContacts(); // refreshing contacts in contacts.html
  document.getElementById('delete-contact-button').classList.remove('d-none');
  openContactDetail(activeUserContacts.length - 1);
}

/*//EDIT CONTACT ////////////////////////////////*/
async function updateUserContact(index) {
  newContactData = getNewContactInfo();

  activeUserContacts.splice(index, 1, newContactData);

  console.log(activeUserContacts);
  await saveInBackendUserContacts();
  await loadAllContacts(); // refreshing contacts in contacts.html
  openContactDetail(index);
}

function getContactInfo() {
  // activeUser = activeUser.userEmail;
  let newName = document.getElementById("new-contact-name").value;
  let newEmail = document.getElementById("new-contact-email").value;
  let newPhone = document.getElementById("new-contact-phone").value;
  let initials = setContactInitials(newName);
  let initialsColor = setColorForInitial(initials);
  let newContact = {
    // id: activeUser,
    name: newName,
    initials: initials,
    initialsColor: initialsColor,
    email: newEmail,
    phone: newPhone,
  };
  return newContact;
}

function sorryEmailAlreadyExists() {
  document.getElementById("info-text").classList.remove("info-text");
  document.getElementById("info-text").innerHTML = `Sorry, a contact with this e-mail already exists!`;
  document.getElementById("info-text").classList.add("info-text-alert");
  // const myTimeout = setTimeout(openAddContactDialog(), 2000);
}

function getNewContactInfo() {
  // activeUser = activeUser.userEmail;
  let newName = document.getElementById("edit-contact-name").value;
  let newEmail = document.getElementById("edit-contact-email").value;
  let newPhone = document.getElementById("edit-contact-phone").value;
  let initials = setContactInitials(newName);
  let initialsColor = setColorForInitial(initials);
  let newContact = {
    // id: activeUser,
    name: newName,
    initials: initials,
    initialsColor: initialsColor,
    email: newEmail,
    phone: newPhone,
  };
  return newContact;
}

function setContactInitials(newName) {
  var names = newName.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  } else if (names.length == 1) {
    initials = newName.substring(0, 2).toUpperCase();
  }
  return initials;
}

function setColorForInitial(initials) {
  let number = 0;
  for (let i = 0; i < initials.length; i++) {
    let letterNumber = initials.charCodeAt(i) - 64;
    number = number + letterNumber;
  }
  let remainder = number % 5;
  if (remainder === 0) {
    return "rgb(221,70,60)";
  } else if (remainder === 1) {
    return "rgb(252,188,201)";
  } else if (remainder === 2) {
    return "rgb(99,191,215)";
  } else if (remainder === 3) {
    return "rgb(253,197,38)";
  } else return "rgb(128,168,77)";
}

function openContactDetail(index) {
  let content = document.getElementById("contact-detail");
  let { name, initials, initialsColor, email, phone } = getContactDetails(index);

  content.innerHTML = "";
  content.innerHTML = generateContactDetail(index, name, initials, initialsColor, email, phone);
}

/*// HTML RENDERING & ANIMATION ////////////////////////////////*/
function renderContactList() {
  let content = document.getElementById("contact-list");
  content.innerHTML = " ";

  for (let i = 0; i < activeUserContacts.length; i++) {
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
</div>
      `;
}
