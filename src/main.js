import 'babel-polyfill';
import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, div} from '@cycle/dom';
import isolate from '@cycle/isolate';

import CurrencyField from './Components/CurrencyField';
//import Percentage from './Components/Percentage';
import Slider from './Components/Slider';

const Main = (sources) => {

    const valueField = isolate(CurrencyField, 'value')({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Property Value',
            initial: 400000
        })
    });

    const depositField = isolate(Slider, 'deposit')({
        DOM: sources.DOM
    });

    //const depositPercentage = isolate(Percentage, 'deposit-percentage')({
    //    DOM: sources.DOM,
    //    props$: Observable.combineLatest(
    //        depositField.value$,
    //        valueField.value$,
    //        (numerator, denominator) => {
    //            return {numerator, denominator};
    //        }
    //    )
    //});

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
