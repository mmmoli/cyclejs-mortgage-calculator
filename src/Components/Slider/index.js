import {input, div, span} from '@cycle/dom';

const Slider = (sources) => {

    // Intent
    const sliderChanges$ = sources.DOM
        .select('input')
        .events('input');

    // Model
    const value$ = sliderChanges$
        .map(evt => evt.target.value)
        .startWith(0);

    // View
    const DOM = value$.map(value => {
        return div([
            input({
                type: 'range',
                value
            }),
            span(value.toString())
        ]);
    });

    return {
        DOM,
        value$
    };
};

export default Slider;
