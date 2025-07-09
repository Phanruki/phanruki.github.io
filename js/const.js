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
                properties: ['right', 'transform', 'width', 'opacity'],
                values: { end: ['6%', 'translate(0%, -50%)', '52dvw', '1'] },
                duration: 1000
            },
            /* containerSubText: {
                properties: ['transform', 'opacity'],
                values: { start: ['translate(-50%, 0%)', '0'], end: ['translate(0%, 0%)', '1'] },
                duration: 1000
            } */
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
                properties: ['right', 'transform', 'opacity',],
                values: { end: ['50%', 'translate(50%, -50%) scaleX(0.1)', '0'] },
                duration: 1000
            },
        },
        change: {
            hidden: {
                up: {
                    properties: ['transform', 'opacity'],
                    values: { end: ['translate(0%, 100%)', '0'] },
                    duration: 1000
                },
                down: {
                    properties: ['transform', 'opacity'],
                    values: { end: ['translate(0%, -100%)', '0'] },
                    duration: 1000
                }
            },
            display: {
                up: {
                    properties: ['transform', 'opacity'],
                    values: { start: ['translate(0%, 100%)', '0'], end: ['translate(0%, 0%)', '1'] },
                    duration: 1000
                },
                down: {
                    properties: ['transform', 'opacity'],
                    values: { start: ['translate(0%, -100%)', '0'], end: ['translate(0%, 0%)', '1'] },
                    duration: 1000
                }
            }
        },
        changeX: {
            hidden: {
                up: {
                    properties: ['transform', 'opacity'],
                    values: { end: ['translate(100%, 0%)', '0'] },
                    duration: 1000
                },
                down: {
                    properties: ['transform', 'opacity'],
                    values: { end: ['translate(-100%, 0%)', '0'] },
                    duration: 1000
                },
                main: {
                    properties: ['transform', 'opacity'],
                    values: { end: ['translate(-100%, -35%)', '0'] },
                    duration: 1000
                }
            },
            display: {
                up: {
                    properties: ['transform', 'opacity', 'left'],
                    values: { start: ['translate(100%, 0%)', '0', '0px'], end: ['translate(50%, 0%)', '1', '-50%'] },
                    duration: 1000
                },
                down: {
                    properties: ['transform', 'opacity', 'left'],
                    values: { start: ['translate(-100%, 0%)', '0', '0px'], end: ['translate(50%, 0%)', '1', '-50%'] },
                    duration: 1000
                },
                main: {
                    properties: ['transform', 'opacity'],
                    values: { start: ['translate(-100%, -35%)', '0'], end: ['translate(-50%, -35%)', '1'] },
                    duration: 1000
                }
            }
        }
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
        sub: {
            container: DOM.elementID('container__sub'),
            aboutDescription: DOM.elementID('about-me__description'),
            aboutExtra: DOM.elementID('about-me__extra')
        }
    },
    header: {
        about: document.getElementById('header--about-me__description'),
        skills: document.getElementById('header--about-me__extra'),
        programming: document.getElementById('header--programming-skills'),
        education: document.getElementById('header--education'),
        portfolio: document.getElementById('header--portfolio'),
        contact: document.getElementById('header--contact')
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

export const SECTIONS = {
    main: document.getElementById('container__main'),
    about: document.getElementById('about-me__description'),
    skills: document.getElementById('about-me__extra'),
    programming: document.getElementById('programming-skills'),
    education: document.getElementById('education'),
    portfolio: document.getElementById('portfolio'),
    contact: document.getElementById('contact')
};

export const scrollState = {
    currentSection: 'about',
    isAnimating: false,
    sectionsOrder: ['main', 'about', 'skills', 'programming', 'education', 'portfolio', 'contact']
};