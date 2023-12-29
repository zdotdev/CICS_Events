function mobileMenu(){
    const menuButton = document.getElementById('menu');
    const menuContainer = document.getElementById('menu-container');
    const closeButton = document.getElementById('close-button');
    const cover = document.getElementById('cover');

    menuButton.onclick = function () {
        menuContainer.classList.toggle('active');
        cover.classList.toggle('active');
    };

    closeButton.onclick = function () {
        menuContainer.classList.remove('active');
        cover.classList.remove('active');
    };
};

window.onload = 
mobileMenu();