import { changeTheme, animateElement, handleResponsiveChanges, changeSection } from "./functions.js";
import { ELEMENTS, scrollState, SECTIONS } from "./const.js";
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

let flag = 0

document.addEventListener('click', (event) => {
    if (event.target.closest('#menu__color-change')) {
        animateElement(ELEMENTS.color.header, 'menu.open.colorChange')
    } else if (!event.target.closest('#color-change')) {
        animateElement(ELEMENTS.color.header, 'menu.close.colorChange')
    }

    if (!ELEMENTS.sizeWindow.matches) {
        if (event.target.closest('#menu__header') && flag === 0) {
            animateElement(ELEMENTS.menu.row, 'menu.open.headerRow')
            animateElement(ELEMENTS.container.main, 'menu.open.containerMain')
            animateElement(ELEMENTS.container.sub.container, 'menu.close.containerSub').onfinish = () => {
                DOM.addClass(ELEMENTS.container.sub.container, 'hidden')
            };

            flag = 1;
            return
        } else if (!event.target.closest('#header__row') || event.target.closest('#menu__header')) {
            animateElement(ELEMENTS.menu.row, 'menu.close.headerRow')
            animateElement(ELEMENTS.container.main, 'menu.close.containerMain')
            DOM.removeClass(ELEMENTS.container.sub.container, 'hidden')
            animateElement(ELEMENTS.container.sub.container, 'menu.open.containerSub')

            flag = 0;
            return
        }

        if (event.target.closest('#header--about-me')) {
            animateElement(ELEMENTS.menu.row, 'menu.close.headerRow')
            animateElement(ELEMENTS.container.main, 'menu.close.containerMain')
            DOM.removeClass(ELEMENTS.container.sub.container, 'hidden')
            animateElement(ELEMENTS.container.sub.container, 'menu.open.containerSub')

            flag = 0;
        }
    }
})

/* Sections display function */

if (ELEMENTS.sizeWindow.matches) {

    let touchStartX = 0;
    let touchStartY = 0;

    document.body.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.body.addEventListener('touchmove', (e) => {
        if (scrollState.isAnimating) {
            console.log('Animation in progress, skipping...');
            return;
        }

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;

        const diffX = touchStartX - touchEndX; // Positive if swiped left, negative if right
        const diffY = touchStartY - touchEndY; // Positive if swiped up, negative if down

        // Only trigger if horizontal movement is dominant (e.g., at least 2x more than vertical)
        if (Math.abs(diffX) > Math.abs(diffY) * 2) {
            // Optional: Prevent default to block page scrolling

            const scrollDirection = diffX > 0 ? 'down' : 'up';
            console.log(`Swiped ${scrollDirection}`);

            /* if (scrollDirection === 'down') {
                DOM.addClass(ELEMENTS.container.main, 'hidden')
            } */

            const animationType = scrollDirection === 'up' ? 'menu.changeX.hidden.up' : 'menu.changeX.hidden.down';
            const animationTypeReverse = scrollDirection === 'up' ? 'menu.changeX.display.down' : 'menu.changeX.display.up';

            console.log(`User scrolled: ${scrollDirection}`);

            changeSection(scrollDirection, animationType, animationTypeReverse)

            return
        }
    })
};

if (!ELEMENTS.sizeWindow.matches) {
    console.log('error')
    document.body.addEventListener("wheel", async (e) => {
        if (scrollState.isAnimating) {
            console.log('Animation in progress, skipping...');
            return;
        }

        const scrollDirection = e.deltaY > 0 ? 'down' : 'up';

        const animationType = scrollDirection === 'up' ? 'menu.change.hidden.up' : 'menu.change.hidden.down';
        const animationTypeReverse = scrollDirection === 'up' ? 'menu.change.display.down' : 'menu.change.display.up';

        console.log(`User scrolled: ${scrollDirection}`);

        changeSection(scrollDirection, animationType, animationTypeReverse)
    })
};