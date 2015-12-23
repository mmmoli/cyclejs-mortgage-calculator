import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';

const main = (sources) => {

    const intent = (sources) => {
        return {}
    };

    return {
        DOM: makeDOMDriver('#app')
    }
};