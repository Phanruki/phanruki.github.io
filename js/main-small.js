import { elementID, addClass, removeClass } from "/js/main.js";

//Variables
let sizeWindow = window.matchMedia("(max-width: 1134px) and (max-height: 745px)");

//Constant id elements.
const menuColor = elementID('menu__color-change')
const menuHeader = elementID('menu__header')
const containerBody = elementID('container__body')

//Funcion menu 

function display(sizeWindow, menu, className) {
    if (sizeWindow.matches) {
        if (className) addClass(menu, className);
        removeClass(menu, 'hidden');
    } else {
        addClass(menu, 'hidden')
        if (className) removeClass(menu, className);
    }
}

function displayNormal(sizeWindow, menu, className) {
    if (sizeWindow.matches) {
        addClass(menu, 'hidden')
        if (className) removeClass(menu, className);
    } else {
        console.log(`Clase: ${className}`)
        console.log(className)
        if (className) addClass(menu, className);
        removeClass(menu, 'hidden')
    }
}

//Initial

//Dispaly menu
display(sizeWindow, menuColor)
displayNormal(sizeWindow, menuHeader, '')

//Display body
displayNormal(sizeWindow, containerBody, '')

//Change listener

sizeWindow.addEventListener("change", function () {
    //Display menu
    display(sizeWindow, menuColor, 'menu')
    displayNormal(sizeWindow, menuHeader, '')


    //Display body
    displayNormal(sizeWindow, containerBody, '')
});
