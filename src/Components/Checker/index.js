import {div, input, p} from '@cycle/dom';
import {compose} from 'ramda';

const intent = (sources) => {

    const toggles$ = sources.DOM
        .select('input')
        .events('change')
        .map(ev => ev.target.checked)
        .startWith(false);

    return {
        toggles$
    };

};

const model = (actions) => {

    const isChecked$ = actions.toggles$.map((isChecked) =>
        isChecked
    );

    return {
        isChecked$
    };
};

const view = (state) => {

    const {isChecked$} = state;

    return isChecked$.map(isChecked =>
        div([
            input({type: 'checkbox'}, `Toggle me`),
            p(isChecked ? 'ON' : 'off')
        ])
    );
};

const Checker = (sources) => {

    const makeDOM = compose(view, model, intent);

    return {
        DOM: makeDOM(sources)
    };
};

export default Checker;
