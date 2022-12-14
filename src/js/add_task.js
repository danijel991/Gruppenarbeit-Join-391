// This function will change bg-color of urgency button
function changeUrgencyHigh() {
    document.getElementById('urgency-btn-1').style.backgroundColor = "#FF3D00";
    document.getElementById('urgency-btn-1').style.color = "#FFFFFF";
    document.getElementById('img-prio-high').style.backgroundImage = "url('../img/prio_high_white.png')";
    document.getElementById('img-prio-high').style.backgroundRepeat = "no-repeat";
    event.preventDefault();
}

function changeUrgencyMedium() {}

function changeUrgencyLow() {}

// This function will add subtask
function addSubtask() {}

// This function will add form-data
function addTask() {
console.log('add task');
}

// This function will clear form
function clearForm() {
    console.log('clearForm');
}