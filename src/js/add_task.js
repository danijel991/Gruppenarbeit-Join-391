// This function will change bg-color of urgency button
function changeUrgencyHigh() {
    document.getElementById('urgency-btn-1').style.backgroundColor = "#FF3D00";
    document.getElementById('urgency-btn-1').style.color = "#FFFFFF";
    document.getElementById('img-prio-high').style.backgroundImage = "url('../img/prio_high_white.png')";
    document.getElementById('img-prio-high').style.backgroundRepeat = "no-repeat";
    event.preventDefault();
}

function changeUrgencyMedium() { }

function changeUrgencyLow() { }

// This function will add subtask
function addSubtask() { }

// This function will add form-data
function addTask() {
    console.log('add task');
}

// This function will clear form
function clearForm() {
    console.log('clearForm');
}

// function checkButtonColor(id) {
//     let div = document.getElementById(id);
//     div.firstElementChild.checked = true;
// }

function checkButtonColor() {
    if (document.getElementById('lightblue').checked) {
        document.getElementById('shadowLightblue').classList.add('checkedRadio');
    } else if (document.getElementById('red').checked) {
        document.getElementById('shadowRed').classList.add('checkedRadio');
    } else if (document.getElementById('green').checked) {
        document.getElementById('shadowGreen').classList.add('checkedRadio');
    } else if (document.getElementById('orange').checked) {
        document.getElementById('shadowOrange').classList.add('checkedRadio');
    } else if (document.getElementById('violet').checked) {
        document.getElementById('shadowViolet').classList.add('checkedRadio');
    } else if (document.getElementById('blue').checked) {
        document.getElementById('shadowBlue').classList.add('checkedRadio');
    }
}