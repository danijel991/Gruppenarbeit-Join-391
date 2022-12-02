function initLogo(){
    changeBg();
    changeLogo();
    minimiseLogo();
}


function minimiseLogo(){
    let container = document.getElementById('logo_container');
    container.style.top = "7rem"
    container.style.left = "7rem"
}


function changeBg(){
    let container = document.getElementById('logo_container');
    container.style.backgroundColor = "unset";
}

function changeLogo(){
    document.getElementById('logo__img').src= "/src/img/logo_blue.png";
}