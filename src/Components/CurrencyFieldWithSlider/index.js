import {div, span} from '@cycle/dom';
import CurrencyField from '../CurrencyField';
import Slider from '../Slider';
import isolate from '@cycle/isolate';
import {Observable, BehaviorSubject} from 'rx';

const CurrencyFieldWithSlider = (sources) => {

    const TextInput = isolate(CurrencyField, 'currency-field');

    const value$ = new BehaviorSubject(0);

    const textInput = TextInput({
        DOM: sources.DOM,
        props$: sources.props$,
        value$
    });

    const slider = isolate(Slider, 'slider-field')({
        DOM: sources.DOM,
        props$: sources.props$,
        value$
    });

    // View
    const DOM = Observable.combineLatest(
        textInput.DOM,
        slider.DOM,
        value$,
        (textDOM, sliderDOM, value) =>
            div([
                div(`yo`),
                textDOM,
                sliderDOM,
                span(`master: ${value.toString()}`)
            ])
    );

    return {
        DOM,
        value$: value$.distinctUntilChanged()
    };
};

export default CurrencyFieldWithSlider;
