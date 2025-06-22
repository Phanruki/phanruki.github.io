export { changeTheme }
import { keyframes, ELEMENTS } from "./const.js";

// Change color function
function changeTheme(themeKey) {
    document.body.className = '';

    if (THEMES[themeKey]) {
        document.body.classList.add(THEMES[themeKey]);
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
    toggleResponsiveDisplay(mediaQuery, ELEMENTS.container.body, null, true);
}, 500);