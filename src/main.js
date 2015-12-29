import 'babel-polyfill';
import Cycle from '@cycle/core';
import {Observable} from 'rx';
import {makeDOMDriver, div, h} from '@cycle/dom';
import isolate from '@cycle/isolate';
import './styles/main.less';

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
        props$: valueField.value$.map(max => {
            return {
                label: 'Deposit',
                initial: 100000,
                max
            };
        })
    });

    const slider = isolate(Slider, 'fun-slider')({
        DOM: sources.DOM,
        props$: Observable.of({
            label: 'Fake',
            initial: 500,
            min: 80,
            max: 90
        })
    });

    const DOM = Observable.combineLatest(
        valueField.DOM,
        depositField.DOM,
        slider.DOM,
        (valueDOM, depositDOM, sliderDOM) =>
            div({className: 'wrapper'}, [
                h('h1', `Mortgage Calculator`),
                valueDOM,
                depositDOM,
                sliderDOM
            ])
    );

    return {
        DOM
    };
};

Cycle.run(Main, {
    DOM: makeDOMDriver('#app')
});
