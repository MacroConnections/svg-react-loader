var objectToElement = require('./object-to-element');

module.exports = function objectToModule (obj) {
    var elements = objectToElement(obj);
    return 'var React = require(\'react\');\n' +
        'module.exports = function () { return ' + elements + '; };';
};

