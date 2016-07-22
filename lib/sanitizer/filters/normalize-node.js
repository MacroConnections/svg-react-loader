var R = require('ramda');

var tagname  = 'tagname';
var props    = 'props';
var children = 'children';

var hasProps    = R.has(props);
var hasChildren = R.has(children);
var pickKeys    = R.pick([props, tagname, children]);

module.exports = R.curry(function normalizeNode (opts, value) {
    if (this.notLeaf) {
        if (hasProps(value) || hasChildren(value)) {
            this.update(pickKeys(value));
        }
    }
});
