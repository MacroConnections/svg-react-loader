var R = require('ramda');
var hasUnderscore = R.has('_');

module.exports = R.curry(function underscoreToChildren (opts, value) {
    if (this.notLeaf && hasUnderscore(value)) {
        const text = value._;
        delete value._;
        if (value.children) {
            value.children.push(text);
        }
        else {
            value.children = [text];
        }
    }
});
