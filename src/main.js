import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, div} from '@cycle/dom';

import Checker from './Components/Checker';

const Main = (sources) => {

    const props$ = Observable.of({
        label: 'Mega toggle'
    });

    const checker = Checker({
        DOM: sources.DOM,
        props$
    });

    const isChecked$ = checker.isChecked$;
    const checkerVTree$ = checker.DOM;

    const vtree$ = checkerVTree$.withLatestFrom(isChecked$, (checkerVTree, isChecked) =>
        div([
            checkerVTree,
            div(`Checked? ${isChecked}`)
        ])
    );

    return {
        DOM: vtree$
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app')
});
