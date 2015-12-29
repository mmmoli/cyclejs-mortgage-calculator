import {input, div, span} from '@cycle/dom';
import {Observable} from 'rx';

const Slider = (sources) => {

    const initialValue$ = sources.props$
        .map(props => props.initial ? props.initial : 0);

    const min$ = sources.props$
        .map(props => props.min ? props.min : 0);

    const max$ = sources.props$
        .map(props => props.max ? props.max : 100);

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
        .map(value => parseInt(value, 0))
        .combineLatest(
            min$,
            max$,
            (value, min, max) => {

                if ((value >= min) && (value <= max)) {
                    return value;
                } else if (value > max) {
                    return max;
                }
                return min;
            }
        )
        .map(value => {
            if (sources.value$) {
                sources.value$.onNext(value);
            }
            return value;
        });

    // View
    const DOM = Observable
        .combineLatest(
            min$,
            max$,
            value$,
            (min, max, value) => {
                return div([
                    input({
                        type: 'range',
                        min,
                        max,
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
