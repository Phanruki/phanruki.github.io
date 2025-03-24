/* Animation function */

function addAnimation(element, animation, duration) {
    if (animation) {
        element.style.animation = `${animation} ${duration}`;
    }
}

/* Loader */

window.onload = async () => {
    const loader = document.getElementById('loader');

    addAnimation(loader, 'fadeOut', '2s');

    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 2000);
}

/* Change color function */

function changeTheme(theme) {
    document.body.removeAttribute('class')
    if (theme) {
        document.body.classList.add(theme)
    }
}

document.getElementById('version--pink--trigger').onclick = () => {
    changeTheme('version--pink')
}
document.getElementById('version--white--trigger').onclick = () => {
    changeTheme('version--white')
}
document.getElementById('version--dark--trigger').onclick = () => {
    changeTheme()
}

/* Menu display function */

const headerColor = document.getElementById('header__color');

document.addEventListener('click', function (event) {
    if (event.target.closest('#menu__color-change') && (headerColor.style.right != '0px')) {
        addAnimation(headerColor, 'displayMenu', '1s');

        setTimeout(() => {
            headerColor.style.right = '0px'
        }, 1000);


    } else if (!event.target.closest('#color-change')) {
        addAnimation(headerColor, 'closeMenu', '1s');

        setTimeout(() => {
            headerColor.style.removeProperty('right');
        }, 1000);
    }
})

