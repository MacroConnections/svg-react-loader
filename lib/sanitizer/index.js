var R        = require('ramda');
var traverse = require('traverse');

module.exports = R.curry(function sanitize (opts, tree) {
    var options = require('./options')(opts);
    var namekey = options.namekey;
    var tagkey  = options.tagkey;
    var filters = options.filters;

    return traverse.map(tree, function (value) {
        var ctx     = this;
        var path    = this.path;
        var isProps = path[path.length - 2] === 'props';
        var prop    = isProps && path[path.length - 1];

        if (this.notLeaf && namekey in value) {
            Object.assign(value, R.objOf(tagkey, value[namekey]));
            delete value[namekey];
        }

        if (this.isLeaf && prop) {
            filters.
                forEach(function (fn) {
                    fn(prop, value, ctx);
                });
        }
    });
});
