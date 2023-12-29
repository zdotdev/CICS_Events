function mobileMenu(){
    const menuButton = document.getElementById('menu');
    const menuContainer = document.getElementById('menu-container');
    const closeButton = document.getElementById('close-button');
    const cover = document.getElementById('cover');
    const body = document.querySelector('.body');

    menuButton.onclick = function () {
        menuContainer.classList.toggle('active');
        cover.classList.toggle('active');
        body.classList.toggle('scroll-off');
    };

    closeButton.onclick = function () {
        menuContainer.classList.remove('active');
        cover.classList.remove('active');
        body.classList.remove('scroll-off');
    };
};

window.onload = 
mobileMenu();