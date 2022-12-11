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

async function loadAllContacts() {
  await init();
  let activeUserID = activeUser["userID"];

  let activeUserContacts = usersArray[0]["userContacts"];

  let allContacts = activeUserContacts;
  let content = document.getElementById("contact-list");
  content.innerHTML = " ";

  for (let i = 0; i < allContacts.length; i++) {
    content.innerHTML += `
      <div class="contact-box">
      <div class="letters">${allContacts[i]["initials"]}</div>
      <div>
      <div class="contact-name">${allContacts[i]["name"]}</div>
      <div class="contact-name">${allContacts[i]["email"]}</div>
      <div class="contact-name">${allContacts[i]["phone"]}</div>
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
  let newContact = {
    name: newName,
    initials: initials,
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
