import {replace} from 'ramda';
import {input, div, label} from '@cycle/dom';
import {Observable} from 'rx';

const CurrencyField = (sources) => {

    const initialValue$ = sources.props$
        .map(props => props.initial ? props.initial : 0);

    const label$ = sources.props$
        .map(props => props.label)
        .startWith('label');

    const text$ = sources.DOM
        .select('input')
        .events('input')
        .map(ev => ev.target.value || '0');

    const input$ = sources.value$ ?
        Observable
            .merge(text$, sources.value$)
            .distinctUntilChanged()
        : text$;

    const value$ = initialValue$
        .concat(input$)
        .map(textInput => {
            const digits = replace(/\D/g, '', textInput.toString());
            return parseInt(digits, 10);
        })
        .map(value => {
            if (sources.value$) {
                sources.value$.onNext(value);
            }
            return value;
        });

    const valueStr$ = value$
        .map(value => value.toLocaleString());

    const DOM = Observable.combineLatest(
        valueStr$,
        label$,
        (value, labelTxt) => {

            const id = `${labelTxt}:${value}`;

            return div({className: 'mb-'}, [
                label({
                    className: 'form-label',
                    htmlFor: id
                }, labelTxt),
                input({
                    type: 'text',
                    className: 'form-input',
                    id,
                    value
                })
            ])
        }
    );

    return {
        DOM,
        valueStr$,
        value$
    };
};

export default CurrencyField;
