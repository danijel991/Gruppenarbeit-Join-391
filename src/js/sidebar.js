function active(id) {
    document.getElementById(id).classList.add('active');
    if (id == 'board') {
        removeActive('summary', 'task', 'contacts', 'legal-notice');
    } else if (id == 'task') {
        removeActive('summary', 'board', 'contacts', 'legal-notice');
    } else if (id == 'contacts') {
        removeActive('summary', 'board', 'task', 'legal-notice');
    } else if (id == 'legal-notice') {
        changeLegalNoticeButton(id);
        removeActive('summary', 'board', 'contacts', 'task');
    } else if (id == 'summary') {
        removeActive('task', 'board', 'contacts', 'legal-notice');
    }
    
}


function removeActive(id, id2, id3, id4) {
    document.getElementById(id).classList.remove('active');
    document.getElementById(id2).classList.remove('active');
    document.getElementById(id3).classList.remove('active');
    document.getElementById(id4).classList.remove('active');
    document.getElementById(id4).classList.remove('second-active');
}


function changeLegalNoticeButton(id) {
    document.getElementById(id).classList.add('second-active');
    document.getElementById('legal-notice-icon').src = '../img/legal-notice-icon-active.png';
}