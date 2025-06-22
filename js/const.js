import { DOM } from "./dom.js";

export const keyframes = {
    menu: {
        open: {
            colorChange: {
                properties: ['right'],
                values: { end: '0px' },
                duration: 1000
            },
            headerRow: {
                properties: ['left'],
                values: { end: 'clamp(30px, 5dvw, 50px)' },
                duration: 1000
            },
            containerMain: {
                properties: ['left', 'transform'],
                values: {
                    end: ['50%', 'translate(-50%, -50%)']
                },
                duration: 1000
            },
            containerSub: {
                properties: ['right', 'transform', 'width'],
                values: { end: ['6%', 'translate(0%, -50%)', '52dvw'] },
                duration: 1000
            },
        },
        close: {
            colorChange: {
                properties: ['right'],
                values: { end: 'clamp(-54px, -24.9091px - 2.8409vw, -34px)' },
                duration: 1000
            },
            headerRow: {
                properties: ['left'],
                values: { end: '-140px' },
                duration: 1000
            },
            containerMain: {
                properties: ['left', 'transform'],
                values: {
                    end: ['8%', 'translate(0%, -50%)']
                },
                duration: 1000
            },
            containerSub: {
                properties: ['right', 'transform', 'width'],
                values: { end: ['50%', 'translate(50%, -50%)', '0px'] },
                duration: 1000
            }
        },
    },
    fadeOut: {
        properties: ['opacity'],
        values: { start: 1, end: 0 },
        duration: 2000
    }
}

export const ELEMENTS = {
    // Color elements
    color: {
        header: DOM.elementID('header__color'),
        menu: DOM.elementID('menu__color-change')
    },

    // Menu elements
    menu: {
        header: DOM.elementID('menu__header'),
        row: DOM.elementID('header__row')
    },

    // Container elements
    container: {
        body: DOM.elementID('container__body'),
        main: DOM.elementID('container__main'),
        sub: DOM.elementID('container__sub')
    },

    // Loader
    loader: DOM.elementID('loader'),

    //Display
    sizeWindow: window.matchMedia("(max-width: 1134px) and (max-height: 934px)"),

    // Theme triggers
    themeTriggers: {
        pink: DOM.elementID('version--pink--trigger'),
        white: DOM.elementID('version--white--trigger'),
        dark: DOM.elementID('version--dark--trigger')
    }
};