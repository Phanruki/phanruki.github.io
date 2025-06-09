import { elementID, addClass, removeClass } from "/js/main.js";

//Variables
let sizeWindow = window.matchMedia("(max-width: 1134px) and (max-height: 745px)");

//Constant id elements.
const menuColor = elementID('menu__color-change')
const menuHeader = elementID('menu__header')

//Funcion menu 

function menuDisplay(sizeWindow, menu) {
    if (sizeWindow.matches) {
        addClass(menu, 'menu')
        removeClass(menu, 'hidden')
    } else {
        addClass(menu, 'hidden')
        removeClass(menu, 'menu')
    }
}

function menuDisplayNormal(sizeWindow, menu) {
    if (sizeWindow.matches) {
        addClass(menu, 'hidden')
        removeClass(menu, 'menu')
    } else {
        addClass(menu, 'menu')
        removeClass(menu, 'hidden')
    }
}

//Initial

menuDisplay(sizeWindow, menuColor)
menuDisplayNormal(sizeWindow, menuHeader)

//Change listener

sizeWindow.addEventListener("change", function () {
    menuDisplay(sizeWindow, menuColor)
    menuDisplayNormal(sizeWindow, menuHeader)
});
