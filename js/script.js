import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTImerId = setTimeout(
        () => openModal('.modal', modalTImerId),
        10000
    );
    // tab
    // json-server db.json for working with server

    // const tabs = require('./modules/tabs'),
    //     modal = require('./modules/modal'),
    //     timer = require('./modules/timer'),
    //     cards = require('./modules/cards'),
    //     forms = require('./modules/forms'),
    //     slider = require('./modules/slider'),
    //     calc = require('./modules/calc');

    // tabs();
    // modal();
    // timer();
    // cards();
    // forms();
    // slider();
    // calc();

    // es6

    tabs(
        '.tabheader__item',
        '.tabcontent',
        '.tabheader__items',
        'tabheader__item_active'
    );
    modal('[data-modal]', '.modal', modalTImerId);
    timer('.timer', '2023-06-11');
    cards();
    forms('form', modalTImerId);
    slider({
        container: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slider',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
    calc();
});
