var R = require('ramda');

module.exports = function objectToElement (obj) {
    var isString = typeof obj === 'string';

    if (isString) {
        return JSON.stringify(obj);
    }

    var result =
        'React.createElement(' +
        JSON.stringify(obj.tagname) + ',' +
        JSON.stringify(obj.props || null);

    if (obj.children && obj.children.length) {
        result += ',[' + obj.children.map(objectToElement).join(',') + ']';
    }

    result += ')';

    return result;
};

