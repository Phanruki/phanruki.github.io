export { menuColor, menuHeader, containerBody, containerMain, containerSub, sizeWindow, loader, headerColor, headerRow }
import { DOM } from "./dom.js";

export const THEMES = {
    pink: 'version--pink',
    white: 'version--white',
    dark: null
};

export const keyframes = {
    menu: {
        openColorChange: {
            properties: ['right'],
            values: { end: '0px' },
            duration: 1000
        },
        closeColorChange: {
            properties: ['right'],
            values: { start: '0%', end: 'clamp(-54px, -24.9091px - 2.8409vw, -34px)' },
            duration: 1000
        },
        openHeaderRow: {
            properties: ['left'],
            values: { end: 'clamp(30px, 5dvw, 50px)' },
            duration: 1000
        },
        closeHeaderRow: {
            properties: ['left'],
            values: { end: '-140px' },
            duration: 1000
        },
        openContainerMain: {
            properties: ['left', 'transform'],
            values: {
                end: ['50%', 'translate(-50%, -50%)']
            },
            duration: 1000
        },
        closeContainerMain: {
            properties: ['left', 'transform'],
            values: {
                end: ['8%', 'translate(0%, -50%)']
            },
            duration: 1000
        },
        openContainerSub: {
            properties: ['right', 'transform', 'width'],
            values: { end: ['6%', 'translate(0%, -50%)', '52dvw'] },
            duration: 1000
        },
        closeContainerSub: {
            properties: ['right', 'transform', 'width'],
            values: { end: ['50%', 'translate(50%, -50%)', '0px'] },
            duration: 1000
        }
    },
    fadeOut: {
        properties: ['opacity'],
        values: { start: 1, end: 0 },
        duration: 2000
    }
}

/* Settings */
//Loader
const loader = DOM.elementID('loader');

//Display
const sizeWindow = window.matchMedia("(max-width: 1134px) and (max-height: 934px)");

/* By ID */
//Small display

//Color
const headerColor = DOM.elementID('header__color');
const menuColor = DOM.elementID('menu__color-change')

//Normal display
const headerRow = DOM.elementID('header__row')
const menuHeader = DOM.elementID('menu__header')
const containerBody = DOM.elementID('container__body')
const containerMain = DOM.elementID('container__main')
const containerSub = DOM.elementID('container__sub')