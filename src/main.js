import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, p, div} from '@cycle/dom';
import isolate from '@cycle/isolate';

import Checker from './Components/Checker';

const Main = (sources) => {

    const CheckerHappy = isolate(Checker, 'happy');
    const CheckerSleepy = isolate(Checker, 'sleepy');

    const checkerHappy = CheckerHappy({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Happy?'
        })
    });

    const checkerSleepy = CheckerSleepy({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Sleepy?'
        })
    });

    const ishappy$ = checkerHappy.isChecked$;
    const isSleepy$ = checkerSleepy.isChecked$;

    const checkerHappyVTree$ = checkerHappy.DOM;
    const checkerSleepyVTree$ = checkerSleepy.DOM;

    const state$ = Observable
        .combineLatest(
            ishappy$,
            isSleepy$,
            (isHappy, isSleepy) => {
                return {isSleepy, isHappy};
            }
        );

    const vtree$ = state$.withLatestFrom(
        checkerHappyVTree$,
        checkerSleepyVTree$,
        (state, cHappy, cSleepy) => {
            return div([
                cHappy,
                cSleepy,
                p(`Happy? ${state.isHappy}`),
                p(`Sleepy? ${state.isSleepy}`)
            ]);
        });

    return {
        DOM: vtree$
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app')
});
