import { changeTheme, animateElement, handleResponsiveChanges } from "./functions.js";
import { ELEMENTS } from "./const.js";
import { DOM } from "./dom.js";

/* General */
//Loader
window.onload = async () => {
    animateElement(ELEMENTS.loader, 'fadeOut').onfinish = () => {
        DOM.addStyle(loader, 'visibility', 'hidden');
    };
}

//Change theme  
Object.entries(ELEMENTS.themeTriggers).forEach(([theme, element]) => {
    element.onclick = () => changeTheme(theme);
});


/* Initial */

handleResponsiveChanges(ELEMENTS.sizeWindow);

/* Change listener */

ELEMENTS.sizeWindow.addEventListener("change", () => handleResponsiveChanges(ELEMENTS.sizeWindow));

/* Menu display function */

document.body.addEventListener('click', (event) => {
    if (event.target.closest('#menu__color-change')) {
        animateElement(ELEMENTS.color.header, 'menu.open.colorChange')

    } else if (!event.target.closest('#color-change')) {
        animateElement(ELEMENTS.color.header, 'menu.close.colorChange')
    }

    if (!ELEMENTS.sizeWindow.matches) {
        if (event.target.closest('#menu__header')) {
            animateElement(ELEMENTS.menu.row, 'menu.open.headerRow')
            animateElement(ELEMENTS.container.main, 'menu.open.containerMain')
            animateElement(ELEMENTS.container.sub, 'menu.close.containerSub')

        } else if (!event.target.closest('#header__row')) {
            animateElement(ELEMENTS.menu.row, 'menu.close.headerRow')
            animateElement(ELEMENTS.container.main, 'menu.close.containerMain')
            animateElement(ELEMENTS.container.sub, 'menu.open.containerSub')
        }
    }
})

