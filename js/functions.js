export { changeTheme }
import { keyframes, ELEMENTS, scrollState, SECTIONS } from "./const.js";
import { DOM } from "./dom.js";

// Change color function
function changeTheme(themeKey) {
    document.body.className = '';

    console.log(themeKey)
    if (themeKey) {
        document.body.classList.add(themeKey);
    }
}

/* Functions for animations */

//Animation Function
export function animateElement(element, presetPath, overrides = {}) {
    // Split preset path (e.g., 'menu.openColorChange' -> ['menu', 'openColorChange'])
    const pathParts = presetPath.split('.');
    let preset = keyframes;

    // Traverse the preset path
    for (const part of pathParts) {
        preset = preset[part];
        if (!preset) {
            console.error(`Preset "${presetPath}" not found`);
            return null;
        }
    }

    // Merge preset with overrides
    const config = { ...preset, ...overrides };
    const { properties, values, duration, easing = 'ease-in-out', fill = 'forwards' } = config;

    // Fallback: Compute current styles for ALL properties if `values.start` is missing
    const startValues = values.start ?? properties.map(prop => getComputedStyle(element)[prop]);
    const endValues = values.end;

    // Generate keyframes
    const animationKeyframes = [
        generateKeyframe(properties, startValues),
        generateKeyframe(properties, endValues)
    ];

    return element.animate(animationKeyframes, { duration, easing, fill });
}

function generateKeyframe(properties, values) {
    // Case 1: Single value for all properties (e.g., `values = "0px"` or `0`)
    if (typeof values !== 'object' || values === null) {
        return properties.reduce((frame, prop) => {
            frame[prop] = values;
            return frame;
        }, {});
    }

    // Case 2: Array of values (e.g., `values = ["20%", "translate(0%, -50%)"]`)
    if (Array.isArray(values)) {
        return properties.reduce((frame, prop, index) => {
            frame[prop] = values[index];
            return frame;
        }, {});
    }

    // Case 3: Object with per-property values (e.g., `values = { left: "20%", transform: "translateX(0%)" }`)
    return properties.reduce((frame, prop) => {
        frame[prop] = values[prop];  // Directly map property names
        return frame;
    }, {});
}


/* Functions for responsive display */

// Debounce function
function debounce(func, wait = 500, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

//Functions for display elements matching size window
export function toggleResponsiveDisplay(mediaQuery, element, className = null, invert = false) {
    const shouldShow = invert ? !mediaQuery.matches : mediaQuery.matches;

    // Toggle visibility
    element.classList.toggle('hidden', !shouldShow);

    // Manage optional class
    if (className) {
        const classes = Array.isArray(className) ? className : [className];
        classes.forEach(cls => element.classList.toggle(cls, shouldShow));
    }
}

export const handleResponsiveChanges = debounce((mediaQuery) => {
    //Display menu
    toggleResponsiveDisplay(mediaQuery, ELEMENTS.color.menu, 'menu');
    toggleResponsiveDisplay(mediaQuery, ELEMENTS.menu.header, 'menu', true);
    //Display body
    /* toggleResponsiveDisplay(mediaQuery, ELEMENTS.container.sub.container, null, true); */
}, 500);

let flag = 0
export async function changeSection(scrollDirection, animationType, animationTypeReverse) {
    let currentIndex = scrollState.sectionsOrder.indexOf(scrollState.currentSection);
    let nextSection = scrollState.currentSection;

    if (!ELEMENTS.sizeWindow.matches && currentIndex === 1 && scrollDirection === 'up') {
        return
    }
    if (ELEMENTS.sizeWindow.matches && currentIndex === 1 && scrollDirection === 'down' && flag === 0) {
        currentIndex = currentIndex - 1
        console.log(currentIndex)
        nextSection = scrollState.sectionsOrder.indexOf(currentIndex);
        scrollState.currentSection = 'main'
        flag = 1
    }
    console.log(currentIndex)
    console.log(nextSection)

    if (scrollDirection === 'down' && currentIndex < scrollState.sectionsOrder.length - 1) {
        nextSection = scrollState.sectionsOrder[currentIndex + 1];
        console.log(currentIndex, 'a')
        console.log(nextSection)
    } else if (scrollDirection === 'up' && currentIndex > 0) {
        nextSection = scrollState.sectionsOrder[currentIndex - 1];
    }

    if (nextSection !== scrollState.currentSection) {
        console.log(nextSection)
        console.log(`Changing section from ${scrollState.currentSection} to ${nextSection}`);
        scrollState.isAnimating = true;

        try {
            const currentSectionElement = SECTIONS[scrollState.currentSection];
            const nextSectionElement = SECTIONS[nextSection];

            if (currentSectionElement && nextSectionElement) {
                // Next secction visible outside the screen.
                nextSectionElement.classList.remove('hidden');

                // All animation at the same time.
                await Promise.all([
                    new Promise(resolve => {
                        let animationOut = animateElement(currentSectionElement, animationType);
                        console.log(currentSectionElement)
                        if (scrollState.currentSection === 'main') {
                            animationOut = animateElement(currentSectionElement, 'menu.changeX.hidden.main');
                            console.log('hechp')
                        }
                        else {
                            animationOut = animateElement(currentSectionElement, animationType);
                        }

                        animationOut.onfinish = () => {
                            currentSectionElement.classList.add('hidden');
                            resolve();
                        };
                    }),
                    new Promise(resolve => {
                        console.log(nextSection)
                        if (scrollState.currentSection === 'about' && nextSection === 'main') {
                            animateElement(nextSectionElement, 'menu.changeX.display.main').onfinish = resolve;
                            console.log('bbbb')
                        } else {
                            animateElement(nextSectionElement, animationTypeReverse).onfinish = resolve;
                        }
                    })
                ]);

                console.log(`Transition complete from ${scrollState.currentSection} to ${nextSection}`);
            }

            // Update section state
            scrollState.currentSection = nextSection;
            console.log('New current section:', scrollState.currentSection);

        } finally {
            console.log('Animation complete');
            scrollState.isAnimating = false;
        }
    }
}

export async function selectedChangeSection(nextSection) {
    const currentIndex = scrollState.sectionsOrder.indexOf(scrollState.currentSection);
    let animationType, animationTypeReverse;

    if (ELEMENTS.sizeWindow.matches && currentIndex === 1 && flag === 0) {
        scrollState.currentSection = 'main'
        if (nextSection !== 1) {
            DOM.addClass(SECTIONS.about, 'hidden')
        }
        flag = 1
    }

    if (ELEMENTS.sizeWindow.matches) {
        animationType = nextSection > currentIndex === true ? 'menu.changeX.hidden.up' : 'menu.changeX.hidden.down';
        animationTypeReverse = nextSection > currentIndex === true ? 'menu.changeX.display.down' : 'menu.changeX.display.up';
    }
    if (!ELEMENTS.sizeWindow.matches) {
        animationType = nextSection > currentIndex === true ? 'menu.change.hidden.up' : 'menu.change.hidden.down';
        animationTypeReverse = nextSection > currentIndex === true ? 'menu.change.display.down' : 'menu.change.display.up';
    }
    console.log(nextSection)
    nextSection = scrollState.sectionsOrder[nextSection]
    if (nextSection !== scrollState.currentSection) {
        console.log(nextSection)
        console.log(`Changing section from ${scrollState.currentSection} to ${nextSection}`);
        scrollState.isAnimating = true;

        try {
            const currentSectionElement = SECTIONS[scrollState.currentSection];
            const nextSectionElement = SECTIONS[nextSection];

            if (currentSectionElement && nextSectionElement) {
                // Next secction visible outside the screen.
                nextSectionElement.classList.remove('hidden');

                // All animation at the same time.

                await Promise.all([
                    new Promise(resolve => {
                        let animationOut = animateElement(currentSectionElement, animationType);
                        console.log(currentSectionElement)
                        if (scrollState.currentSection === 'main') {
                            animationOut = animateElement(currentSectionElement, 'menu.changeX.hidden.main');
                            console.log('hechp')
                        }
                        else {
                            animationOut = animateElement(currentSectionElement, animationType);
                        }

                        animationOut.onfinish = () => {
                            currentSectionElement.classList.add('hidden');
                            resolve();
                        };
                    }),
                    new Promise(resolve => {
                        console.log(nextSection)
                        animateElement(nextSectionElement, animationTypeReverse).onfinish = resolve;
                    })
                ]);

                console.log(`Transition complete from ${scrollState.currentSection} to ${nextSection}`);
            }

            // Update section state
            scrollState.currentSection = nextSection;
            console.log('New current section:', scrollState.currentSection);

        } finally {
            console.log('Animation complete');
            scrollState.isAnimating = false;
        }
    }
}