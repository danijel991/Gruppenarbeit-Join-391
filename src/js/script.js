async function init() {
    // initLogo();
    await includeHTML();
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


// Changes the "Log In" to "Sign In"
function toSignInPage() {
    let attribute = "w3-include-html";
    let src = "/src/html/sign_up.html";
    let holder = document.getElementById('logIn_signIn');
    holder.innerHTML = holder.setAttribute(attribute, src)
    includeHTML();
}


// Changes the "Sign In" back to "Log In"
function toLogIn(){
    let attribute = "w3-include-html";
    let src = "/src/html/log_in.html";
    let holder = document.getElementById('logIn_signIn');
    holder.innerHTML = holder.setAttribute(attribute, src)
    includeHTML();
}