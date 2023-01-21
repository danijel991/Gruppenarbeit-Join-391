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
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    link.href = "../html/summary.html?" + params.toString();
    link2.href = "../html/summary.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Board Page
 */
function toBoard() {
    let link = document.getElementById('board');
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    link.href = "../html/board.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Add Task Page
 */
function toAddTask() {
    let link = document.getElementById('task');
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    link.href = "../html/add_task.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Contacts Page
 */
function toContacts() {
    let link = document.getElementById('contacts');
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    link.href = "../html/contacts.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Legal Notice Page
 */
function toLegalNotice() {
    let link = document.getElementById('legal-notice');
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    link.href = "../html/legal_notice.html?" + params.toString();
}


/**
 * The functions is providing the User Email to Help Page
 */
function toHelp() {
    let link = document.getElementById('help');
    let params = new URLSearchParams(window.location.search);
    let first = params.get("first");
    let userEmail = JSON.parse(params.get("second"));
    link.href = "../html/help.html?" + params.toString();
}


/**
 * The function is getting the location in order si highlight the sidebar.
 */
function getHighlight() {
    let pathname = this.location.pathname;
    let location = getLocation(pathname);
}


/**
 * The function is adding a class in order to highlight the button.
 * 
 * @param {string} pathname - The URL path.
 */
function getLocation(pathname) {
    if (pathname.match("summary")) {
        document.getElementById('summary').classList.add('sidebar__highlight');
    }
    if (pathname.match("board")) {
        document.getElementById('board').classList.add('sidebar__highlight');
    }
    if (pathname.match("task")) {
        document.getElementById('task').classList.add('sidebar__highlight');
    }
    if (pathname.match("contacts")) {
        document.getElementById('contacts').classList.add('sidebar__highlight');
    }
    if (pathname.match("legal_notice")) {
        document.getElementById('legal-notice').classList.add('sidebar__highlight');
    }
}