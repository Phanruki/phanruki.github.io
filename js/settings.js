import { elementID, addStyle, animationCreator, keys, changeTheme, display, displayNormal, addClass, removeClass, animationCreatorTwo } from "./functions.js";
import { fadeOut, loader, headerColor, displayMenu, closeMenu, menuColor, menuHeader, containerBody, sizeWindow, headerRow, containerSub, containerMain, closeContainerMain } from "./const.js";


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

    } else if (!event.target.closest('#color-change') && (headerColor.style.right === '0px')) {
        animationCreator(headerColor, keys(closeMenu, 0), keys(closeMenu, 0), closeMenu.right,
            closeMenu.rightEnd, closeMenu.duration)

        setTimeout(() => {
            headerColor.style.removeProperty('right');
        }, 1000);
    }
})

if (!sizeWindow.matches) {
    document.addEventListener('click', (event) => {
        if (event.target.closest('#menu__header') && (headerRow.style.left != 'clamp(30px, 5dvw, 50px)')) {

            animationCreator(headerRow, '', 'left', '', 'clamp(30px, 5dvw, 50px)', displayMenu.duration)
            setTimeout(() => {
                addStyle(headerRow, 'left', 'clamp(30px, 5dvw, 50px)')
            }, 1000);

            animationCreatorTwo(containerMain, keys(closeContainerMain, 0), keys(closeContainerMain, 1), keys(closeContainerMain, 0), keys(closeContainerMain, 1), closeContainerMain.left, closeContainerMain.transform, closeContainerMain.leftEnd, closeContainerMain.transformEnd, closeContainerMain.duration)
            addStyle(containerMain, 'left', '50%')
            addStyle(containerMain, 'transform', 'translate(-50%, -50%)')

            animationCreator(containerSub, keys(fadeOut, 0), keys(fadeOut, 0), fadeOut.opacity, fadeOut.opacityEnd, fadeOut.duration)
            addClass(containerSub, 'hidden')

        } else if (!event.target.closest('#menu__header') && (headerRow.style.left === 'clamp(30px, 5dvw, 50px)')) {

            animationCreator(headerRow, '', 'left', '',
                '-140px', closeMenu.duration)

            setTimeout(() => {
                addStyle(headerRow, 'left', '-140px')
            }, 1000);

            animationCreatorTwo(containerMain, keys(closeContainerMain, 0), keys(closeContainerMain, 1), keys(closeContainerMain, 0), keys(closeContainerMain, 1), closeContainerMain.leftEnd, closeContainerMain.transformEnd, closeContainerMain.left, closeContainerMain.transform, closeContainerMain.duration)
            containerMain.style = ''

            animationCreator(containerSub, keys(fadeOut, 0), keys(fadeOut, 0), fadeOut.opacityEnd, fadeOut.opacity, fadeOut.duration)
            removeClass(containerSub, 'hidden')
        }
    })
}
