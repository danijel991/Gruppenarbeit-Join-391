const color = {
    design: '#FF7A00',
    sales: '#FC71FF',
    backoffice: '#1FD7C1',
    marketing: '#0038FF',
    media: '#FFC701'
}


function changeDepartmentColor() {
    let departmentColor;
    document.querySelectorAll('.department').forEach(department => {    // searches through all classes with the name of department and is iterating through nodelist
        departmentColor = department.innerHTML.toLowerCase();           // saves value(text) from span in variable
        department.style.backgroundColor = color[departmentColor];      // sets the background color to the correct value
    });
}