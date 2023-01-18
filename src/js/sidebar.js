/**
 * The Function is showing the sidebar HTML elements.
 */
async function showSelectedLink() {
    document.querySelectorAll('.menu-btns').forEach(link => {
        if (link.href === window.location.href && window.location.href.includes('legal_notice')) {
            link.classList.add('second-active');
            link.firstElementChild.src = '../img/legal-notice-icon-active.png';
        } else if (link.href === window.location.href) {
            link.classList.add('active');
        }
    })
}


/**
 * The functions is providing the User Email to Summary Page
 */
function toSummary() {
    let link = document.getElementById('summary');
    let link2 = document.getElementById('logo-reload');
    var params = new URLSearchParams(window.location.search);
    var first = params.get("first");
    var userEmail = JSON.parse(params.get("second"));
    link.href = "../html/summary.html?" + params.toString();
    link2.href = "../html/summary.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Board Page
 */
function toBoard() {
    let link = document.getElementById('board');
    var params = new URLSearchParams(window.location.search);
    var first = params.get("first");
    var userEmail = JSON.parse(params.get("second"));
    link.href = "../html/board.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Add Task Page
 */
function toAddTask() {
    let link = document.getElementById('task');
    var params = new URLSearchParams(window.location.search);
    var first = params.get("first");
    var userEmail = JSON.parse(params.get("second"));
    link.href = "../html/add_task.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Contacts Page
 */
function toContacts() {
    let link = document.getElementById('contacts');
    var params = new URLSearchParams(window.location.search);
    var first = params.get("first");
    var userEmail = JSON.parse(params.get("second"));
    link.href = "../html/contacts.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Legal Notice Page
 */
function toLegalNotice(){
    let link = document.getElementById('legal-notice');
    var params = new URLSearchParams(window.location.search);
    var first = params.get("first");
    var userEmail = JSON.parse(params.get("second"));
    link.href = "../html/legal_notice.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Help Page
 */
function toHelp(){
    let link = document.getElementById('help');
    var params = new URLSearchParams(window.location.search);
    var first = params.get("first");
    var userEmail = JSON.parse(params.get("second"));
    link.href = "../html/help.html?" + params.toString();
}