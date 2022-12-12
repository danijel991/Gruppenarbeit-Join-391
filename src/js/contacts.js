/*/////////////////////// ADD NEW CONTACT START ////////////////////////////////*/
function openAddContactDialog() {
  document.getElementById("overlay").classList.remove("d-none");

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
/*/////////////////////// ADD NEW CONTACT END ////////////////////////////////*/
/*/////////////////////// EDIT CONTACT START ////////////////////////////////*/
function openEditContactDialog(index) {
  document.getElementById("overlay2").classList.remove("d-none");
  let allContacts = usersArray[activeUser["userID"]]["userContacts"];
  let contact = allContacts[index];
  const { name, initials, initialsColor, email, phone } = contact;
  let content = document.getElementById("edit-contact-modal");
  content.innerHTML = "";
  content.innerHTML = `
  <div class="contact-dialog-top">
                    <img class="close-icon" src="../img/close_icon.png" onclick="closeEditContactDialog()">
                    <img src="../img/join-logo.png">
                    <h2 class="contact-title" id="exampleModalLabel">Edit contact</h2>

                    <h4 id="info-text" class="info-text">Tasks are better with a team!</h4>

                </div>
                <div class="contact-dialog-bottom">
                    <div class="user-avatar"><img src="../img/user-avatar.png" alt=""></div>
                    <div class="form">
                        <form class="add-contact_form" onsubmit="editUserContact(); return false;">
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
                            <button class="delete-contact-button" required>
                                <span>Delete</span><img src="../img/addcontact.png">
                            </button>
                            <button class="edit-contact-button" required>
                                <span>Save</span><img src="../img/addcontact.png">
                            </div>
                        </form>
                    </div>
                </div>
                `;
                document.getElementById("edit-contact-name").value = `${name}`;
                document.getElementById("edit-contact-email").value = `${email}`;
                document.getElementById("edit-contact-phone").value = `${phone}`;

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

function editUserContact(index) {}
/*/////////////////////// EDIT CONTACT END ////////////////////////////////*/
async function loadAllContacts() {
  await init();

  let allContacts = usersArray[activeUser["userID"]]["userContacts"];
  let content = document.getElementById("contact-list");
  content.innerHTML = " ";

  for (let i = 0; i < allContacts.length; i++) {
    content.innerHTML += `
      <div class="contact-box" onclick="openContactDetail(${i})">
      <div class="letters" style="background-color: ${allContacts[i]["initialsColor"]}">${allContacts[i]["initials"]}</div>
      <div>
      <div>${allContacts[i]["name"]}</div>
      <div>${allContacts[i]["email"]}</div>
      <div>${allContacts[i]["phone"]}</div>
      </div>
      </div>
      `;
  }
}

async function addNewUserContact() {
  let indexActiveUser = activeUser["userID"];
  let activeUserContactsArray = usersArray[0]["userContacts"]; // replace [1] later with 'indexActiveUser'

  activeUserContactsArray.push(getContactInfo());
  // console.log(activeUserContactsArray.push(getContactInfo()));
  await saveInBackend(); // wichtig, bevor weitergeleitet wird auf z. B. Contact Detail View
  // show new Contact Detail

  await loadAllContacts(); // refreshing contacts in contacts.html
}

function getContactInfo() {
  let newName = document.getElementById("new-contact-name").value;
  let newEmail = document.getElementById("new-contact-email").value;
  let newPhone = document.getElementById("new-contact-phone").value;
  let initials = setContactInitials(newName);
  let initialsColor = setColorForInitial(initials);
  let newContact = {
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
  content.innerHTML = " ";

  let allContacts = usersArray[activeUser["userID"]]["userContacts"];
  let contact = allContacts[index];
  const { name, initials, initialsColor, email, phone } = contact;
  console.log(name, initials, initialsColor, email, phone);

  content.innerHTML += `
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
  <div class="contact-detail-medium">894300289490500ß3</div>
</div>
      `;
}
