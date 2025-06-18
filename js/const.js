export { fadeOut, displayMenu, closeMenu, menuColor, menuHeader, containerBody, containerMain, containerSub, sizeWindow, loader, headerColor, headerRow, closeContainerSub, closeContainerMain }
import { elementID } from "./functions.js";

/* Settings */
//Loader
const loader = elementID('loader');

//Display
const sizeWindow = window.matchMedia("(max-width: 1134px) and (max-height: 934px)");

/* By ID */
//Small display

//Color
const headerColor = elementID('header__color');
const menuColor = elementID('menu__color-change')

//Normal display
const headerRow = elementID('header__row')
const menuHeader = elementID('menu__header')
const containerBody = elementID('container__body')
const containerMain = elementID('container__main')
const containerSub = elementID('container__sub')


/* Keyframes */

const displayMenu = {
    'right': '0px',
    'duration': 1000
}

const closeMenu = {
    'right': '0%',
    'rightEnd': 'clamp(-54px, -24.9091px - 2.8409vw, -34px)',
    'duration': 1000
}

const closeContainerSub = {
    'right': '6%',
    'rightEnd': '50%',
    'transform': 'translate(0%, -50%)',
    'transformEnd': 'translate(50%, -50%)',
    'duration': 1000
}

const closeContainerMain = {
    'left': '20%',
    'leftEnd': '50%',
    'transform': 'translate(0%, -50%)',
    'transformEnd': 'translate(-50%, -50%)',
    'duration': 1000
}

const fadeOut = {
    'opacity': 1,
    'opacityEnd': 0,
    'duration': 2000
}


