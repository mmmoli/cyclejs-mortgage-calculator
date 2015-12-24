import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, div} from '@cycle/dom';
import isolate from '@cycle/isolate';

import CurrencyField from './Components/CurrencyField';

const Main = (sources) => {

    const valueField = isolate(CurrencyField, 'value')({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Property Value',
            initial: 400000
        })
    });
    const depositField = isolate(CurrencyField, 'deposit')({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Deposit'
        })
    });

    const DOM = Observable.combineLatest(
        valueField.DOM,
        depositField.DOM,
        (valueDOM, depositDOM) =>
            div([valueDOM, depositDOM])
    );

    return {
        DOM
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app')
});
