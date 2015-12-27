import {replace} from 'ramda';
import {input, div, label} from '@cycle/dom';
import {Observable} from 'rx';

const CurrencyField = (sources) => {

    const initialValue$ = sources.props$
        .map(props => props.initial ? props.initial : 0);

    const label$ = sources.props$
        .map(props => props.label)
        .startWith('label');

    const input$ = sources.DOM
        .select('input')
        .events('change')
        .map(ev => ev.target.value);

    const value$ = initialValue$
        .concat(input$)
        .map(value => {
            const digits = replace(/\D/g, '', value.toString());
            return parseInt(digits, 0);
        });

    const valueStr$ = value$
        .map(value => value.toLocaleString());

    const DOM = Observable.combineLatest(
        valueStr$,
        label$,
        (value, labelTxt) =>

            div([
                label(labelTxt),
                input({
                    type: 'text',
                    value
                })
            ])
    );

    return {
        DOM,
        valueStr: valueStr$,
        value: value$
    };
};

export default CurrencyField;
