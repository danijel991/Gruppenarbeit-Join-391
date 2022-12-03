function initLogo() {
    changeBg();
    changeLogo();
    setTimeout(minimiseLogo(), 2000);
}


function minimiseLogo() {
    let container = document.getElementById('logo__img');
}


function changeBg() {
    document.body.style.backgroundColor = "white";
}

function changeLogo() {
    document.getElementById('logo__img').src = "/src/img/logo_blue.png";
}

/***    Log In  ***/
function logInUser() {
    let emailUser = document.getElementById('email');
    let passwordUser = document.getElementById('password');
    checkIfExists(emailUser, passwordUser);

}

// Check if the user exists
function checkIfExists(emailUser, passwordUser) {
    /*for (let i = 0; i < emailArray.length; i++) {
        if (emailUser == emailArray[i] && passwordUser == passwordArray[i]) {
            toSummaryPage();
        } else if {
            ###     // User not registered! Ask to register
        }
    }*/
    return false
}


// Guest User Function
function logInUserGuest() {
    let guestEmail = "guestemail@gmail.com"
    let guestPassword = "guestpassword"
    document.getElementById('email').value = guestEmail;
    document.getElementById('password').value = guestPassword;
    toSummaryPage();
}

function toSummaryPage() {
    window.open('http://192.168.178.59:5500/src/html/summary.html', '_self');
}