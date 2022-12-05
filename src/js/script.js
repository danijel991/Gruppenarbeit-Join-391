/***    Variable    ***/
let usersArray = [];

/***    Array       ***/


/***    Functions   ***/

async function init() {
    await includeHTML();
    let response = await fetch('./src/js/users.json');
    usersArray = await response.json();
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