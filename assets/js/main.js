/* Loader */
window.onload = () => {
    $('.loader').fadeOut();
    $('.loader').addClass('hidden')
};

/* Style creator function */
function createStyle (css){
    $('<style>')
    .prop('type', 'text/css')
    .html(css)
    .appendTo('head');
}

/* Change style function */
function chageStyle(id, css) {
    $(id).click(()=> {
        createStyle(css)
    })
}

chageStyle('#a', '.title--header { color: var(--pink--light); }')

/* Add header style */
createStyle('.title--header { color: var(--white); }, .title--header {display:flex} ')

$('.header__row__text a').addClass('title--header')





