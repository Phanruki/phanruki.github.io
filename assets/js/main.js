/* Loader */
window.onload = () => {
    $('.loader').fadeOut();
    $('.loader').addClass('hidden')
};

/* Triggers */
const pink = document.getElementById('version--pink--trigger')
const white = document.getElementById('version--white--trigger')
const dark = document.getElementById('version--dark--trigger')

/* Change color functions */
/* pink.onclick = () => {
    $('body').removeClass()
    $('body').addClass('version--pink')
}

white.onclick = () => {
    $('body').removeClass()
    $('body').addClass('version--white')
}

dark.onclick = () => {
    $('body').removeClass()
} */

/* Classes added by jQuery */
$('.header__row__text a').addClass('title--header')



/* Option 2 */

function changeTheme(theme) {
    $('body').removeClass()
    $('body').addClass(theme)
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