import { elementID, addStyle, animationCreator, keys, changeTheme, display, displayNormal, addClass, removeClass } from "./functions.js";
import { fadeOut, loader, headerColor, displayMenu, closeMenu, menuColor, menuHeader, containerBody, sizeWindow, headerRow } from "./const.js";


/* General */
//Loader
window.onload = async () => {

    animationCreator(loader, keys(fadeOut, 0), keys(fadeOut, 0), fadeOut.opacity, fadeOut.opacityEnd, fadeOut.duration)

    setTimeout(() => {
        addStyle(loader, 'visibility', 'hidden')
    }, 2000);
}

//Change theme  
elementID('version--pink--trigger').onclick = () => {
    changeTheme('version--pink')
}
elementID('version--white--trigger').onclick = () => {
    changeTheme('version--white')
}
elementID('version--dark--trigger').onclick = () => {
    changeTheme()
}

/* Initial */

//Display menu
display(sizeWindow, menuColor, 'menu')
displayNormal(sizeWindow, menuHeader, 'menu')

//Display body
displayNormal(sizeWindow, containerBody, '')

/* Change listener */

sizeWindow.addEventListener("change", function () {
    //Display menu
    display(sizeWindow, menuColor, 'menu')
    displayNormal(sizeWindow, menuHeader, 'menu')

    //Display body
    displayNormal(sizeWindow, containerBody, '')
});

/* Menu display function */

document.addEventListener('click', (event) => {
    if (event.target.closest('#menu__color-change') && (headerColor.style.right != '0px')) {
        animationCreator(headerColor, '', keys(displayMenu, 0), '', displayMenu.right, displayMenu.duration)
        setTimeout(() => {
            addStyle(headerColor, 'right', '0px')
        }, 1000);

    } else if (!event.target.closest('#color-change')) {
        animationCreator(headerColor, keys(closeMenu, 0), keys(closeMenu, 0), closeMenu.right,
            closeMenu.rightEnd, closeMenu.duration)

        setTimeout(() => {
            headerColor.style.removeProperty('right');
        }, 1000);
    }
})

document.addEventListener('click', (event) => {
    if (event.target.closest('#menu__header') && (headerRow.style.left != 'clamp(30px, 5dvw, 50px)')) {

        animationCreator(headerRow, '', 'left', '', 'clamp(30px, 5dvw, 50px)', displayMenu.duration)
        setTimeout(() => {
            addStyle(headerRow, 'left', 'clamp(30px, 5dvw, 50px)')
        }, 1000);

        addClass(containerBody, 'hidden')

    } else if (!event.target.closest('#menu__header')) {

        removeClass(containerBody, 'hidden')

        animationCreator(headerRow, '', 'left', '',
            '-140px', closeMenu.duration)

        setTimeout(() => {
            addStyle(headerRow, 'left', '-140px')
        }, 1000);
    }
})


