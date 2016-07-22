var R = require('ramda');
var hasTagname = R.has('tagname');

module.exports = function objectToElement (obj) {
    var result =
        hasTagname(obj) ?
            'React.createElement(' +
            JSON.stringify(obj.tagname) + ',' +
            JSON.stringify(obj.props || null)
        :
        obj;

    if (obj.children && obj.children.length) {
        result += ',[' + obj.children.map(objectToElement).join(',') + ']';
    }

    result += ')';

    return result;
};

