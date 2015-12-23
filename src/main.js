import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver} from '@cycle/dom';

import Checker from './Components/Checker';

const Main = (sources) => {

    return {
        DOM: Checker(sources).DOM
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app'),
    props$: () => {
        return Observable.of({
            label: 'Mega toggle'
        });
    }
});
