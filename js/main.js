export { elementID, addClass, removeClass, addAnimation, addStyle } //Functions
export { headerColor } // Const

//IDs
const headerColor = elementID('header__color');

/* Functions */
//Style function
function addStyle(element, addStyle, property) {
    element.style[addStyle] = property
}

//Animation function
function addAnimation(element, animation, duration) {
    if (animation) {
        addStyle(element, 'animation', `${animation} ${duration}`)
    }
}

//Add and remove class function

function addClass(element, elementClass) {
    console.log(element)
    console.log(elementClass)
    console.log(`${elementClass}`)

    element.classList.add(`${elementClass}`);
}

function removeClass(element, elementClass) {
    element.classList.remove(`${elementClass}`)
}

// Object by ID funtion 

function elementID(id) {
    return document.getElementById(id)
}

/* Change color function */

function changeTheme(theme) {
    console.log(`{theme}`)
    document.body.removeAttribute('class')
    if (theme) {
        document.body.classList.add(theme)
    }
}

/* Loader */

window.onload = async () => {
    const loader = elementID('loader');

    addAnimation(loader, 'fadeOut', '2s');

    setTimeout(() => {
        addStyle(loader, 'visibility', 'hidden')
    }, 2000);
}



elementID('version--pink--trigger').onclick = () => {
    changeTheme('version--pink')
}
elementID('version--white--trigger').onclick = () => {
    changeTheme('version--white')
}
elementID('version--dark--trigger').onclick = () => {
    changeTheme()
}



