import {input, div, span} from '@cycle/dom';
import {Observable} from 'rx';

const Slider = (sources) => {

    const initialValue$ = sources.props$
        .map(props => props.initial ? props.initial : 0);

    const min$ = sources.props$
        .map(props => props.min ? props.min : 0);

    // Intent
    const sliderChanges$ = sources.DOM
        .select('input')
        .events('input')
        .map(evt => evt.target.value);

    // Model
    const input$ = sources.value$ ? sources.value$ : initialValue$;

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
    const DOM = Observable
        .combineLatest(
            min$,
            value$,
            (min, value) => {
                return div([
                    input({
                        type: 'range',
                        min,
                        value
                    }),
                    span(value.toString())
                ]);
            }
        );

    return {
        DOM,
        value$
    };
};

export default Slider;
