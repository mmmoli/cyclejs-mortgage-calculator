import {input, div, span} from '@cycle/dom';
import {Observable} from 'rx';

const Slider = (sources) => {

    // Intent
    const sliderChanges$ = sources.DOM
        .select('input')
        .events('input')
        .map(evt => evt.target.value);

    // Model
    const input$ = sources.value$ ? sources.value$ : Observable.of(0);

    const value$ = Observable
        .merge(sliderChanges$, input$)
        .distinctUntilChanged()
        .map(value => {
            const result = parseInt(value, 10);
            if (sources.value$) {
                sources.value$.onNext(result);
            }
            return result;
        });

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
