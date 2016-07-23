var objectToElement = require('./object-to-element');

module.exports = function objectToModule (obj) {
    var elements = objectToElement(obj);
    return 'var React = require(\'react\');\n' +
        'var merge = Object.assign || function (a, b) { var r = {}, p; for (p in a) { r[p] = a[p]; } for (p in b) { r[p] = b[p]; } return r; };\n' +
        'module.exports = function (props) { return ' + elements + '; };';
};

