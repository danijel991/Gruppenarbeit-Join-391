let allContacts = [];

// let path = "../json/contacts.json";

// async function loadContacts() {
//   let response = await fetch(path);
//   let json = await response.json();
//     console.log(json);

//     let content = document.getElementById('contact-list');
//     content.innerHTML = '';

//     for (let i = 0; i < json.length; i++) {
//         content.innerHTML += `
//         <div class="contact-box">
//         <div class="letters">LG</div>
//         <div>
//         <div class="contact-name">${json[i]['firstname']} ${json[i]['lastname']}</div>
//         <div class="contact-email">${json[i]['email']}</div>
//         </div>
//         </div>
//         ` ;
//     }
// }

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

function addNewContact() {
  let newContactName = document.getElementById("new-contact-name");
  let newContactEmail = document.getElementById("new-contact-email");
  let newContactPhone = document.getElementById("new-contact-phone");

  let newcontact = {
    name: newContactName.value, //dadurch, dass ich hier erste .value hinzufüge, anstatt oben beim getElemenByIDd kann ich nach dieser declaration die felder im HTML leeren und auch sonst felxibler mit der Variable arbeiten, weil ich z. B. .src oder .innerHTML usw. anhägen kann - je nach Bedarf!!!
    email: newContactEmail.value,
    phone: newContactPhone.value,
    createdAt: new Date().getTime(),
  };

  allContacts.push(newcontact);

  let allContactsAsString = JSON.stringify(allContacts);
  localStorage.setItem("allContacts", allContactsAsString);
  console.log("current contacts are: ", allContacts);

  newContactName.value = "";
  newContactEmail.value = "";
  newContactPhone.value = "";
}

function loadAllContacts() {
  let activeUserID = activeUser["userID"];

  let activeUserContacts = usersArray[activeUserID]["userContacts"];
  
  let allContacts = activeUserContacts;
  let content = document.getElementById("contact-list");
  content.innerHTML = "";

  for (let i = 0; i < allContacts.length; i++) {
    content.innerHTML += `
      <div class="contact-box">
      <div class="letters">LG</div>
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
  let activeUserContactsArray = usersArray[indexActiveUser]["userContacts"]; // replace [1] later with 'indexActiveUser'

  activeUserContactsArray.push(getContactInfo());
  // console.log(activeUserContactsArray.push(getContactInfo()));
  await saveInBackend(); // wichtig, bevor weitergeleitet wird auf z. B. Contact Detail View
  // show new Contact Detail
  
  loadAllContacts(); // refreshing contacts in contacts.html
}

function getContactInfo() {
  let newName = document.getElementById("new-contact-name");
  let newEmail = document.getElementById("new-contact-email");
  let newPhone = document.getElementById("new-contact-phone");

  let newContact = {
    name: newName.value,
    email: newEmail.value,
    phone: newPhone.value,
  };
  return newContact;
}
