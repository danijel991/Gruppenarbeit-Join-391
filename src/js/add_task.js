let selectedCategory;
let selectedColor;

/**
 * function renders actual contacts of active user in drop-down menue of Add-Task Dialog
 */
async function init_add_task() {
    await init();
    renderContactsInDropDown();
}

/**
 * function changes bg-color of urgency button
 */
function changeUrgencyHigh() {
    document.getElementById('urgency-btn-1').style.backgroundColor = "#FF3D00";
    document.getElementById('urgency-btn-1').style.color = "#FFFFFF";
    document.getElementById('img-prio-high').style.backgroundImage = "url('../img/prio_high_white.png')";
    document.getElementById('img-prio-high').style.backgroundRepeat = "no-repeat";
    event.preventDefault();
}

/**
 * function clears form
 */
function clearForm() {
    document.getElementById('myForm').reset();
}

/**
 * Function generates HTML within Category input field after a new category was created or an existing one was selected
 * @param {string} category 
 * @param {string} color 
 */
function selectCategory(category, color) {
    document.getElementById('category-dropdown').innerHTML = '';
    document.getElementById('category-dropdown').innerHTML = category + `<div class="category-color ${color}"></div>`;
    document.getElementById('category-dropdown').classList.add('dropdown-active');
    document.getElementById(color).checked = true;
};


/**
 * 
 * @param {string} category 
 * @param {string} color 
 * @returns HTML code that renders content in drop-down menue of Add-Task
 */
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

/**
 * reads user input in AddTask Dialog
 */
function addNewCategory() {
    let category = document.getElementById('category-input').value;
    let color = document.querySelector("input[type=radio][name=color]:checked").value;
    document.getElementById('collapseCategory').innerHTML += generateCategoryHTML(category, color);
    closeCategoryInput();
    selectCategory(category, color);
}