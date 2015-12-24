import {compose, replace} from 'ramda';

const digitsOnly = (input) => {
    return replace(/\D/g, '', input.toString());
};

const strToInt = (input) => {
    return parseInt(input, 0);
};

const formatStr = (raw) => {
    return raw.toLocaleString();
};

const format = compose(formatStr, strToInt, digitsOnly);

export default format;
