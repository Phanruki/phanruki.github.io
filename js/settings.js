import { changeTheme, animateElement, handleResponsiveChanges, changeSection, selectedChangeSection } from "./functions.js";
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
ELEMENTS.sizeWindow.addEventListener("change", () => window.location.reload());

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

        if (event.target.closest('#header--about-me__description')
            || event.target.closest('#header--about-me__extra')
            || event.target.closest('#header--programming-skills')
            || event.target.closest('#header--education')
            || event.target.closest('#header--portfolio')
            || event.target.closest('#header--contact')) {
            animateElement(ELEMENTS.menu.row, 'menu.close.headerRow')
            animateElement(ELEMENTS.container.main, 'menu.close.containerMain')
            DOM.removeClass(ELEMENTS.container.sub.container, 'hidden')
            animateElement(ELEMENTS.container.sub.container, 'menu.open.containerSub')

            flag = 0;
        }


    }

    const element = event.target.closest(
        '#header--about-me__description, ' +
        '#header--about-me__extra, ' +
        '#header--programming-skills, ' +
        '#header--education, ' +
        '#header--portfolio, ' +
        '#header--contact'
    );

    switch (element?.id) {
        case 'header--about-me__description':
            console.log('about-me description')
            selectedChangeSection(1)
            break;

        case 'header--about-me__extra':
            console.log('about-me extra')
            selectedChangeSection(2)
            break;

        case 'header--programming-skills':
            console.log('programming skills')
            selectedChangeSection(3)
            break;

        case 'header--education':
            console.log('education')
            selectedChangeSection(4)
            break;

        case 'header--portfolio':  // Note: Typo? Should it be 'portfolio'?
            console.log('portfolio')
            selectedChangeSection(5)
            break;

        case 'header--contact':
            console.log('contact')
            selectedChangeSection(6)
            break;

        default:
            console.log('aaaaaa')
            break;
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