export const DOM = {
    elementID: (id) => document.getElementById(id),
    addStyle: (element, property, value) => element.style[property] = value,
    addClass: (element, className) => element.classList.add(`${className}`),
    removeClass: (element, className) => element.classList.remove(`${className}`),
}