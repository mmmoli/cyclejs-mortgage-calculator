import {span} from '@cycle/dom';
//import {Observable} from 'rx';

const Percentage = (sources) => {

    const percentage$ = sources.props$.map(props => {
        return (props.numerator * 100 / props.denominator).toFixed(2);
    });

    const DOM = percentage$.map(percentage => span(`${percentage}%`));

    return {
        DOM
    };
};

export default Percentage;
