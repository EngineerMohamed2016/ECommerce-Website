const operatorMap  = require('./operatorMap');

const filterNumeric = (arr, filterObj) => {
    let operator = '';
    arr.map(key => { // key = price 
        if (key === '')
            return;

        if (key.includes('>='))
            operator = '>=';
        else if (key.includes('<='))
            operator = '<=';
        else if (key.includes('>'))
            operator = '>';
        else if (key.includes('<'))
            operator = '<';
        else if (key.includes('='))
            operator = '=';

        // final filterObj like ==> {  price: { '$gt': 2 } }
        filterObj[key.split(operator)[0]] = { [operatorMap[operator]]: Number(key.split(operator)[1]) };
    })
}

module.exports= filterNumeric;





