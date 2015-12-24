import currencyFormat from '../../helpers/currency_format';
import {input, div, label} from '@cycle/dom';
import {Observable} from 'rx';

const CurrencyField = (sources) => {

    const initialValue$ = sources.props$
        .map(props => props.initial ? props.initial : 0);

    const label$ = sources.props$
        .map(props => props.label)
        .startWith('label');

    // Intent
    const input$ = sources.DOM
        .select('input')
        .events('change');

    const value$ = initialValue$.concat(
        input$
            .map(ev => ev.target.value)
    );

    const valueStr$ = value$.map(currencyFormat);

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
        value: value$
    };
};

export default CurrencyField;
