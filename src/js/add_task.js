let selectedCategory;
let selectedColor;

// This function will change bg-color of urgency button
function changeUrgencyHigh() {
    document.getElementById('urgency-btn-1').style.backgroundColor = "#FF3D00";
    document.getElementById('urgency-btn-1').style.color = "#FFFFFF";
    document.getElementById('img-prio-high').style.backgroundImage = "url('../img/prio_high_white.png')";
    document.getElementById('img-prio-high').style.backgroundRepeat = "no-repeat";
    event.preventDefault();
}

// This function will clear form
function clearForm() {
    document.getElementById('myForm').reset();
}

function selectCategory(category, color) {
    const pink = '#FC71FF';
    const turqoise = '#1FD7C1;';
    if (color == 'pink') {
    } else {
        
    }

    document.getElementById('category-dropdown').innerHTML = '';
    document.getElementById('category-dropdown').innerHTML = category + color;
 };
