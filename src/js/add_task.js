let selectedCategory;
let selectedColor;

// funktion, damit er versucht die kontakte bei onload zu befüllen

async function init_add_task() {
    await init();
    renderContactsInDropDown();
}

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
    // const color = {
    //     pink: '#FC71FF',
    //     turqoise: '#1FD7C1;',

    // }

    // let hex = colors[color];

    // if (hex == undefined) {
    //     hex = 'black'
    // }

    document.getElementById('category-dropdown').innerHTML = '';
    document.getElementById('category-dropdown').innerHTML = category + `<div class="category-color ${color}"></div>`;
    document.getElementById('category-dropdown').classList.add('dropdown-active');
    document.getElementById(color).checked = true;
};

// Hier befindet sich die New Cagetory funktion, aus input feld name + farbe 

function generateCategoryHTML(category, color) {
    return `
    <div onclick="selectCategory('${category}','${color}')" class="dropdown-category" id="">
    <label for="category-${category}">${category}</label>
    <input type="radio" name="category" id="category-${category}" value="${category}" role="button" data-bs-toggle="collapse"
    data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
    <div class="category-color ${color}"></div>
    </div>
    `;
}

function addNewCategory() {
    let category = document.getElementById('category-input').value;
    let color = document.querySelector("input[type=radio][name=color]:checked").value;

    console.log(category,color);

    document.getElementById('collapseCategory').innerHTML += generateCategoryHTML(category, color);

    closeCategoryInput();

    selectCategory(category, color);
}