var navBurger;
var navMenu;

function onLoadMenu()
{
    navBurger = document.getElementById("nav-burger");
    navMenu = document.getElementById("nav-menu");
}

function burgerClick()
{
    navBurger.classList.toggle("is-active");
    navMenu.classList.toggle("is-active");
}