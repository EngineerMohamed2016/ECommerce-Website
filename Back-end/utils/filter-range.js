const minMaxMap = require('./minMaxMap');

const filterRange = (arr, filterObj) => {
    let operator = '';
    arr.map(key => {
        if (key === '')
            return;

        if (key.includes('min'))
            operator = minMaxMap['min'];
        else if (key.includes('max'))
            operator = minMaxMap['max'];

        filterObj.price = { ...filterObj.price, [operator]: Number(key.split('=')[1]) }
    });
}

module.exports = filterRange;