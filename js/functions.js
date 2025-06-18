export { display, displayNormal, keys, animationCreator, animationCreatorTwo, addStyle, addClass, elementID, changeTheme, removeClass }

//Style function
function addStyle(element, addStyle, property) {
    element.style[addStyle] = property
}

// Object by ID function 
function elementID(id) {
    return document.getElementById(id)
}

// Change color function
function changeTheme(theme) {
    document.body.removeAttribute('class')
    if (theme) {
        document.body.classList.add(theme)
    }
}

//Add and remove class functions
function addClass(element, elementClass) {
    element.classList.add(`${elementClass}`);
}

function removeClass(element, elementClass) {
    element.classList.remove(`${elementClass}`)
}

/* Functions for animations */

//Keys in objetcts function
function keys(object, i) {
    let keyObject

    Object.keys(object).forEach((key, j) => {
        if (j == i) {
            keyObject = key
        }
    })
    return keyObject;
}

//Animation function
function animationCreator(element, propertyOne, propertyTwo, start, end, duration) {
    element.animate([
        { [propertyOne]: `${start}` },
        { [propertyTwo]: `${end}` }], {
        'duration': duration
    })
}

function animationCreatorTwo(element, propertyOne, propertyTwo, propertyThree, propertyFour, startOne, startTwo, endOne, endTwo, duration) {
    console.log(startOne)
    element.animate([
        { [propertyOne]: `${startOne}` },
        { [propertyTwo]: `${startTwo}` },
        { [propertyThree]: `${endOne}` },
        { [propertyFour]: `${endTwo}` }], {
        'duration': duration
    })
}


//Functions for display elements matching size window
function display(sizeWindow, menu, className) {
    if (sizeWindow.matches) {
        if (className) addClass(menu, className);
        removeClass(menu, 'hidden');
    } else {
        addClass(menu, 'hidden')
        if (className) removeClass(menu, className);
    }
}

function displayNormal(sizeWindow, menu, className) {
    if (sizeWindow.matches) {
        addClass(menu, 'hidden')
        if (className) removeClass(menu, className);
    } else {
        if (className) addClass(menu, className);
        removeClass(menu, 'hidden')
    }
}