import 'babel-polyfill';
import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, div} from '@cycle/dom';
import isolate from '@cycle/isolate';

import CurrencyField from './Components/CurrencyField';
import Slider from './Components/Slider';
import CurrencyFieldWithSlider from './Components/CurrencyFieldWithSlider';

const Main = (sources) => {

    const valueField = isolate(CurrencyField, 'value')({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Property Value',
            initial: 400000
        })
    });

    const depositField = isolate(CurrencyFieldWithSlider, 'deposit')({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Deposit',
            initial: 80
        })
    });

    depositField.value$.subscribe(x => console.log(x));

    const slider = isolate(Slider, 'fun-slider')({
        DOM: sources.DOM
    });

    const DOM = Observable.combineLatest(
        valueField.DOM,
        depositField.DOM,
        slider.DOM,
        (valueDOM, depositDOM, sliderDOM) =>
            div([valueDOM, depositDOM, sliderDOM])
    );

    return {
        DOM
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app')
});
