import {div, input, p, h} from '@cycle/dom';
import {Observable} from 'rx';

const Checker = (sources) => {

    // Intent
    const toggles$ = sources.DOM
        .select('input')
        .events('change')
        .map(ev => ev.target.checked)
        .startWith(false);

    // Model
    const isChecked$ = toggles$.map(isChecked =>
        isChecked
    );

    // View
    const DOM = Observable.combineLatest(
        sources.props$,
        isChecked$,
        (props, isChecked) =>
            div([
                h('label', props.label),
                input({type: 'checkbox'}, `Toggle me`),
                p(isChecked ? 'ON' : 'off')
            ])
    );

    return {
        DOM,
        isChecked$
    };
};

export default Checker;
