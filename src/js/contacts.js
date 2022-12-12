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

  let allContacts = usersArray[activeUser['userID']]["userContacts"];
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
   return 'rgb(221,70,60)';
 } else if (remainder === 1) {
   return 'rgb(252,188,201)';
 } else if (remainder === 2) {
  return 'rgb(99,191,215)';
} else if (remainder === 3) {
  return 'rgb(253,197,38)';
} else 
  return 'rgb(128,168,77)';
}

function openContactDetail(index) {
  let content = document.getElementById("contact-detail");
  content.innerHTML = " ";
  let allContacts = usersArray[activeUser['userID']]["userContacts"];
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
      <div class="edit-contact"><img src="../img/pencil_small.png">Edit Contact</div>
  </div>
  <div class="contact-email">Email</div>
  <div>${email}</div>
  <div class="contact-phone">Phone</div>
  <div>894300289490500ß3</div>
</div>




      
      `;
  

}
