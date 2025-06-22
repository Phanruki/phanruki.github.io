import { changeTheme, animateElement, toggleResponsiveDisplay } from "./functions.js";
import { loader, headerColor, menuColor, menuHeader, containerBody, sizeWindow, headerRow, containerSub, containerMain } from "./const.js";
import { DOM } from "./dom.js";

/* General */
//Loader
window.onload = async () => {

    animateElement(loader, 'fadeOut')

    setTimeout(() => {
        DOM.addStyle(loader, 'visibility', 'hidden')
    }, 2000);
}

//Change theme  
DOM.elementID('version--pink--trigger').onclick = () => {
    changeTheme('pink')
}
DOM.elementID('version--white--trigger').onclick = () => {
    changeTheme('white')
}
DOM.elementID('version--dark--trigger').onclick = () => {
    changeTheme('dark')
}

/* Initial */

//Display menu
toggleResponsiveDisplay(sizeWindow, menuColor, 'menu');
toggleResponsiveDisplay(sizeWindow, menuHeader, 'menu', true);

//Display body
toggleResponsiveDisplay(sizeWindow, containerBody, null, true)

/* Change listener */

sizeWindow.addEventListener("change", function () {
    //Display menu
    toggleResponsiveDisplay(sizeWindow, menuColor, 'menu');
    toggleResponsiveDisplay(sizeWindow, menuHeader, 'menu', true);

    //Display body
    toggleResponsiveDisplay(sizeWindow, containerBody, null, true)
});

/* Menu display function */

document.addEventListener('click', (event) => {
    if (event.target.closest('#menu__color-change')) {
        animateElement(headerColor, 'menu.openColorChange')

    } else if (!event.target.closest('#color-change')) {
        animateElement(headerColor, 'menu.closeColorChange')
    }
})

if (!sizeWindow.matches) {
    document.addEventListener('click', (event) => {
        if (event.target.closest('#menu__header')) {
            animateElement(headerRow, 'menu.openHeaderRow')
            animateElement(containerMain, 'menu.openContainerMain')
            animateElement(containerSub, 'menu.closeContainerSub')

        } else if (!event.target.closest('#header__row')) {
            animateElement(headerRow, 'menu.closeHeaderRow')
            animateElement(containerMain, 'menu.closeContainerMain')
            animateElement(containerSub, 'menu.openContainerSub')
        }
    })
}