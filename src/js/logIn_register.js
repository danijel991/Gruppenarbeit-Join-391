/***    Variables   ***/
let indexActiveUser;
let indexReset;


function logoAnimation() {
    transitionLogo();
    setTimeout(changeBg, 350);
    setTimeout(showCardAndHeader, 400);
    startPage();
}


// Function for the Animation
function changeBg() {
    document.getElementById("initial__file--wrapper").style.background = "white";
}


function transitionLogo() {
    document.getElementById("logo__img").style.left = "0px";
    document.getElementById("logo__img").style.top = "0px";
    document.getElementById("logo__img").style.scale = "1";
    document.getElementById("logo__img").style.opacity = "0";
}


function showCardAndHeader() {
    document.getElementById("logIn__frame").style.display = "flex";
    document.getElementById("to__sign-in--wrapper").style.display = "flex";
}


/***    Log In  ***/
async function logInUser() {
    let emailUser = document.getElementById("email").value;
    let passwordUser = document.getElementById("password").value;
    let acces = await checkIfExists(emailUser, passwordUser);
    goToSummary(acces);
    emailUser.value = "";
    passwordUser = "";
}


// Check if the user exists
async function checkIfExists(emailUser, passwordUser) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let passwordArray = usersArray.map((password) => password.userPassword);
    let findEmail = emailArray.find((email) => email == emailUser);
    let findPassword = passwordArray.find((password) => password == passwordUser);
    if (findEmail === undefined || findPassword === undefined) {
        return false;
    } else {
        let checkbox = callCheckBox();
        if (checkbox == true) {
            await setActiveUser(emailUser);
            return true;
        } else {
            return true;
        }
    }
}


//If "Remember me" is active
function callCheckBox() {
    let checkbox = document.getElementById('rememberMe');
    let result = checkbox.checked;
    checkbox.addEventListener('change', e => {
        if (e.target.checked) {
            checkbox.setAttribute('checked', true);
            result = e.target.checked;
            return result;
        } else {
            result = e.target.checked;
            return result;
        }
    })
    return result;
}


async function setActiveUser(userEmail) {
    let index = checkIfEmailExists(userEmail)
    indexActiveUser = index;
    console.log(indexActiveUser);
    activeUser = usersArray[indexActiveUser];
    activeUser['quickAcces'] = true;
    saveLocalActiveUser(activeUser);
}


async function logInActiveUser() {
    let emailUser = activeUser['userEmail'];
    let passwordUser = activeUser['userPassword'];
    let acces = await checkIfExists(emailUser, passwordUser);
    await setActiveUser(emailUser);
    goToSummary(acces);
    emailUser.value = "";
    passwordUser = "";
}


function goToSummary(acces) {
    if (acces == true) {
        toSummaryPage();
    } else {
        alert("User not registered");
    }
}


async function logOut() {
    activeUser["quickAcces"] = false;
    await saveLocalActiveUser(activeUser);
    toLogInPage();
}


// Guest User Function
function logInUserGuest() {
    let guestEmail = "guestemail@gmail.com";
    let guestPassword = "guestpassword";
    document.getElementById("email").value = guestEmail;
    document.getElementById("password").value = guestPassword;
    logInUser();
}


function toSummaryPage() {
    location.href = "./src/html/summary.html";
}

// Sign Up Functions
async function addNewUser() {
    await getUserInfo();
    cleanInput();
}


async function getUserInfo() {
    let newName = document.getElementById('newUser-name').value;
    let newEmail = document.getElementById('newUser-email').value;
    let newPassword = document.getElementById('newUser-password').value;
    let newID = usersArray.length;
    let newInitials = getInitials(newName);
    let newColor = getColor();
    let newUser = {
        "userName": newName,
        "userEmail": newEmail,
        "userPassword": newPassword,
        "userID": newID,
        "userInitials": newInitials,
        "userPhone": "",
        "userContacts": [],
        "userColor": newColor,
        "quickAcces": false,
    };
    let z = checkIfAlreadyRegistered(newEmail);
    if (z == undefined) {
        await addToDatabase(newUser, newEmail);
        setTimeout(toLogInPage, 1250);
        setTimeout(resetConfirmation, 1250);
    } else {
        alert('Email Already Registered')
    }
}


async function addToDatabase(newUser, newEmail) {
    usersArray.push(newUser);
    await saveInBackend();
    showConfirmation();
}


function checkIfAlreadyRegistered(newEmail) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let findEmail = emailArray.find((email) => email == newEmail);
    return findEmail;
}


function cleanInput() {
    document.getElementById("newUser-name").value = "";
    document.getElementById("newUser-email").value = "";
    document.getElementById("newUser-password").value = "";
}


function getColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r}, ${g}, ${b})`;
    return color;
}


function getInitials(newName) {
    var names = newName.split(" "),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    } else if (names.length == 1) {
        initials = newName.substring(0, 2).toUpperCase();
    }
    return initials;
}


function showConfirmation() {
    document.getElementById('signUp__id--main').classList.add('blur');
    document.getElementById('signUp__id--response').classList.remove('d-none')
    document.getElementById('signUp__id--response').style.transform = "translateY(-20vh)"
}


function resetConfirmation() {
    document.getElementById('signUp__id--main').classList.remove('blur');
    document.getElementById('signUp__id--response').classList.add('d-none')
    document.getElementById('signUp__id--response').style.transform = "translateY(0vh)"
}


/*** Reset Password functions ***/
function toResetPassword() {
    let emailUser = document.getElementById("forgot__password--email").value;
    let index = checkIfEmailExists(emailUser);
    indexReset = getIndex(index);
    allowResetPassword(index);
    return indexReset;
}


function getIndex(index) {
    return index;
}


async function resetPasswordUser(indexReset) {
    let oldPass = usersArray[indexReset];
    let newPass = document.getElementById('user__newPassword-1').value;
    let confirmPass = document.getElementById('user__newPassword-2').value;
    if (indexReset >= 0 && newPass === confirmPass) {
        oldPass['userPassword'] = newPass;
        await saveInBackend();
        toLogInPage();
    } else {
        alert('The password do not match')
    }
    clearInputNewPassword();
}


function changeDivReset() {
    document.getElementById("forgot__request").classList.add("d-none");
    document.getElementById("forgot__newPassword").classList.remove("d-none");
}


function clearInputNewPassword() {
    document.getElementById("user__newPassword-1").value = "";
    document.getElementById("user__newPassword-2").value = "";
}


function checkIfEmailExists(emailUser) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let findEmailIndex = emailArray.findIndex((email) => email == emailUser);
    return findEmailIndex;
}


function allowResetPassword(index) {
    if (index >= 0) {
        changeDivReset();
    } else {
        alert("Email not registered");
    }
}


function toLogInPage() {
    window.location.href = "./../../index.html";
}