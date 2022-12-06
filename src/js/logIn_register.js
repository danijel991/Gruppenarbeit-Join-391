
function logoAnimation() {
    transitionLogo();
    setTimeout(changeBg, 350);
    setTimeout(showCardAndHeader, 400);
    init();
}


function changeBg() {
    document.getElementById('initial__file--wrapper').style.background = 'white'
}

function transitionLogo() {
    document.getElementById('logo__img').style.left = "0px";
    document.getElementById('logo__img').style.top = "0px";
    document.getElementById('logo__img').style.scale = "1";
    document.getElementById('logo__img').style.opacity = "0";
}



function showCardAndHeader() {
    document.getElementById('logIn__frame').style.display = "flex";
    document.getElementById('to__sign-in--wrapper').style.display = "flex";
}


/***    Log In  ***/
function logInUser() {
    let emailUser = document.getElementById('email').value;
    let passwordUser = document.getElementById('password').value;
    checkIfExists(emailUser, passwordUser);
    emailUser.value = "";
    passwordUser = "";
}

// Check if the user exists
function checkIfExists(emailUser, passwordUser) {
    for (let i = 0; i < usersArray.length; i++) {
        let emailArray = usersArray[i]["userEmail"];
        let passwordArray = usersArray[i]["userPassword"];
        if (emailUser == emailArray && passwordUser == passwordArray) {
            usersArray[i]["userAcces"] = true;
            toSummaryPage();
        } else {
            alert('Not register yet test')
        }
    }
    return false;
}


// Guest User Function
function logInUserGuest() {
    let guestEmail = "guestemail@gmail.com"
    let guestPassword = "guestpassword"
    document.getElementById('email').value = guestEmail;
    document.getElementById('password').value = guestPassword;
    checkIfExists(emailUser, passwordUser);
}


function toSummaryPage() {
    location.href = './src/html/summary.html';
}


// Sign Up Functions
function addNewUser() {
    getUserInfo();
    cleanInput();
    // showConfirmation();
}


function getUserInfo() {
    let newName = document.getElementById('newUser-name').value;
    let newEmail = document.getElementById('newUser-email').value;
    let newPassword = document.getElementById('newUser-password').value;
    let newID = usersArray.length;
    let newInitials = getInitials(newName);
    let newColor = getColor();
    let newUser = {
        "userName": String(newName),
        "userEmail": String(newEmail),
        "userPassword": String(newPassword),
        "userID": String(newID),
        "userInitials": String(newInitials),
        "userPhone": "",
        "userContacts": [],
        "userColor": String(newColor),

    };
    usersArray.push(newUser);
    saveInBackend();
}



function cleanInput() {
    document.getElementById('newUser-name').value = '';
    document.getElementById('newUser-email').value = '';
    document.getElementById('newUser-password').value = '';
}


function getColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r}, ${g}, ${b})`
    return color;
}

function getInitials(newName) {
    var names = newName.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    } else if (names.length == 1) {
        initials = newName.substring(0, 2).toUpperCase();
    }
    return initials;
};



