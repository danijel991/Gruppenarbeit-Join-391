/***    Variables   ***/
let indexActiveUser;
let indexReset;
let showLogOut = true;
let passwordVisible = false;


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

// Main function in script.js

// Check if the user exists
async function checkIfExists(emailUser, passwordUser) {
    let emailArray = usersArray.map((email) => email.userEmail);
    let passwordArray = usersArray.map((password) => password.userPassword);
    let findEmail = emailArray.find((email) => email == emailUser);
    let findPassword = passwordArray.find((password) => password == passwordUser);
    if (findEmail === undefined) {
        return false;
    } else if (emailUser === findEmail && passwordUser === findPassword) {
        return true;
    }

}


// Check validation on submit
function validatedInput(emailUser, passwordUser) {
    let validation = document.getElementById('logIn__validation');
    let emailArray = usersArray.map((email) => email.userEmail);
    let passwordArray = usersArray.map((password) => password.userPassword);
    let findEmail = emailArray.find((email) => email == emailUser);
    let findPassword = passwordArray.find((password) => password == passwordUser);
    responseValitation(emailUser, passwordUser, validation, findEmail, findPassword);
}


function responseValitation(emailUser, passwordUser, validation, findEmail, findPassword) {
    if (emailUser != findEmail && passwordUser != findPassword) {
        validation.classList.remove('d-none');
        validation.innerHTML = 'Wrong email and password'
    } else if (emailUser === findEmail && passwordUser != findPassword) {
        validation.classList.remove('d-none');
        validation.innerHTML = 'Wrong password';
    } else if (emailUser != findEmail) {
        validation.classList.remove('d-none');
        validation.innerHTML = 'Wrong email';
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
    activeUser = usersArray[indexActiveUser];
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


function goToSummary(acces, emailUser) {
    if (acces == true) {
        getActiveUserURL(emailUser);
    }
}


function toLogInPage() {
    window.location.href = "./../../index.html";
}


function toLogOut() {
    const target = document.getElementById('userPhoto');
    document.addEventListener('click', (event) => {
        const withinBoundaries = event.composedPath().includes(target)
        const tologOut = document.getElementById('logOut__btn--container');
        if (withinBoundaries) {
            tologOut.classList.remove('d-none');
        } else {
            tologOut.classList.add('d-none');
        }
    }
    )
}

// Guest User Function
function logInUserGuest() {
    let guestEmail = "guestemail@gmail.com";
    let guestPassword = "guestpassword";
    document.getElementById("email").value = guestEmail;
    document.getElementById("password").value = guestPassword;
    logInUser();
}


async function getActiveUserURL(emailUser) {
    var first = "email";
    var second = `${emailUser}`;
    let params = new URLSearchParams();
    params.append("first", first);
    params.append("second", JSON.stringify(second));
    return params;
}

async function goToSummary(acces, emailUser) {
    if (acces == true) {
        let params = await getActiveUserURL(emailUser)
        location.href = "./src/html/summary.html?" + params.toString();
    }
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
        document.getElementById('compar__password--validation').classList.add('d-none')
        oldPass['userPassword'] = newPass;
        await saveInBackend();
        showNewPasswordConfirmed();
        setTimeout(toLogInPage, 1000);
    } else {
        document.getElementById('compar__password--validation').classList.remove('d-none')
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
        document.getElementById('forgot__email--validation').classList.add('d-none')
        showSendEmail();
        setTimeout(changeDivReset, 1500);
    } else {
        document.getElementById('forgot__email--validation').classList.remove('d-none')
    }
}


function showSendEmail() {
    document.querySelector('.forgot__file--wrapper').classList.add('blur')
    document.querySelector('.response__forgot--container').classList.remove('d-none')
    document.getElementById('email__sent').classList.remove('d-none');
    setTimeout(animateSentEmail, 1);
}


function resetSentEmail() {
    document.querySelector('.forgot__file--wrapper').classList.remove('blur')
    document.querySelector('.response__forgot--container').classList.add('d-none')
    document.getElementById('email__sent').classList.add('d-none');
    document.getElementById('email__sent').style.transform = "translateX(-50%) translateY(0vh)";
}


function animateSentEmail() {
    document.getElementById('email__sent').style.transition = "all 750ms ease-in-out";
    document.getElementById('email__sent').style.transform = "translateX(-50%) translateY(-20vh)";
    setTimeout(resetSentEmail, 1000);
}

function showNewPasswordConfirmed() {
    document.querySelector('.forgot__file--wrapper').classList.add('blur')
    document.querySelector('.response__forgot--container').classList.remove('d-none')
    document.getElementById('reset__confirmed').classList.remove('d-none');
    setTimeout(animatePasswordConfirmed, 1);
}


function resetPasswordConfirmed() {
    document.querySelector('.forgot__file--wrapper').classList.remove('blur')
    document.querySelector('.response__forgot--container').classList.add('d-none')
    document.getElementById('reset__confirmed').classList.add('d-none');
    document.getElementById('reset__confirmed').style.transform = "translateX(-50%) translateY(0vh)";
}


function animatePasswordConfirmed() {
    document.getElementById('reset__confirmed').style.transition = "all 750ms ease-in-out";
    document.getElementById('reset__confirmed').style.transform = "translateX(-50%) translateY(-20vh)";
    setTimeout(resetPasswordConfirmed, 1000);
}


function checkPasswordImg() {
    setInterval(() => {
        let a = 0;
        let input = document.getElementById('password');
        let img = document.getElementById('password__img');
        if (input.value.length > a && passwordVisible) {
            img.src = "./src/img/icon_password_visible.png";
            input.type = "text";
        } else if (input.value.length > a && !passwordVisible) {
            img.src = "./src/img/icon_password_nonvisible.png";
            input.type = "password";
        } else {
            img.src = "./src/img/input_password.png";
        }
    }, 100)
}


function changeViewPassword() {
    if (passwordVisible === false) {
        passwordVisible = true;
    } else {
        passwordVisible = false;
    }
}