import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, div} from '@cycle/dom';
import isolate from '@cycle/isolate';

import CurrencyField from './Components/CurrencyField';
import Percentage from './Components/Percentage';

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
    const depositPercentage = isolate(Percentage, 'deposit-percentage')({
        DOM: sources.DOM,
        props$: Observable.combineLatest(
            depositField.value,
            valueField.value,
            (numerator, denominator) => {
                return {numerator, denominator};
            }
        )
    });

    const DOM = Observable.combineLatest(
        valueField.DOM,
        depositField.DOM,
        depositPercentage.DOM,
        (valueDOM, depositDOM, percentDOM) =>
            div([valueDOM, depositDOM, percentDOM])
    );

    return {
        DOM
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app')
});
