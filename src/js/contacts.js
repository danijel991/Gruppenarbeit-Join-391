let path = "../json/contacts.json";

async function loadContacts() {
  let response = await fetch(path);
  let json = await response.json();
    console.log(json);
    
    let content = document.getElementById('contact-list');
    content.innerHTML = '';
    
    for (let i = 0; i < json.length; i++) {
        content.innerHTML += `
        <div class="contact-box">
        <div class="letters">LG</div>
        <div>
        <div class="contact-name">${json[i]['firstname']} ${json[i]['lastname']}</div>
        <div class="contact-email">${json[i]['email']}</div>
        </div>
        </div>
        ` ;
    }
    
}
