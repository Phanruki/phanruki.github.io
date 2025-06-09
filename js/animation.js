import { elementID, addClass, removeClass, addAnimation, addStyle } from "/js/main.js";
const headerColor = elementID('header__color');

//Animations - Keyframes
const displayMenu = {
    'right': '0px',
    'duration': 1000
}

const closeMenu = {
    'right': '0%',
    'rightEnd': 'clamp(-54px, -24.9091px - 2.8409vw, -34px)',
    'duration': 1000
}

//Functions
function keys(object, i) {
    let keyObject

    Object.keys(object).forEach((key, j) => {
        if (j == i) {
            keyObject = key
        }
    })
    return keyObject;
}

function animationCreator(element, propertyOne, propertyTwo, start, end, duration) {
    element.animate([
        { [propertyOne]: `${start}` },
        { [propertyTwo]: `${end}` }], {
        'duration': duration
    })
}

/* Menu display function */

document.addEventListener('click', function (event) {
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