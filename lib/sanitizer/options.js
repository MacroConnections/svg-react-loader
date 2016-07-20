var R = require('ramda');

var DEFAULTS = {
    namekey: require('../xml/xml2js-name-key'),
    tagkey: 'tagname',
    filters: [
        function xmlns (prop, value, context) {
            switch (prop) {
            case 'xmlns':
            case 'xmlnsXlink':
                context.delete();
            }
        }
    ]
};

module.exports = function (opts) {
    if (opts) {
        if (opts.filters) {
            opts.attrNameProcessors =
                DEFAULTS.
                filters.
                slice().
                concat(opts.filters);
        }
    }

    return R.merge(DEFAULTS, opts || {});
};

