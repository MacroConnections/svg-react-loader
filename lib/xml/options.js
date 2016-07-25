var R = require('ramda');

var DEFAULTS = {
    explicitChildren:      true,
    preserveChildrenOrder: true,
    explicitRoot:          false,
    attrkey:               'props',
    childkey:              'children',
    tagkey:                'tagname',
    attributeMappings: {
        'class': 'className',
        'for': 'htmlFor'
    },
    attrNameProcessors: [
        require('../util/camel-case')(/[:-]/g)
    ],
    tagNameProcessors: []
};

module.exports = function (opts) {
    if (opts && opts.attributeMappings) {
        opts.attributeMappings =
            R.merge(DEFAULTS.attributeMappings, opts.attributeMappings);
    }

    if (opts && opts.attrNameProcessors) {
        opts.attrNameProcessors =
            DEFAULTS.
            attrNameProcessors.
            slice().
            concat(opts.attrNameProcessors);
    }

    if (opts && opts.tagNameProcessors) {
        opts.tagNameProcessors =
            DEFAULTS.
            tagNameProcessors.
            slice().
            concat(opts.tagNameProcessors);
    }

    var options = R.merge(DEFAULTS, opts || {});

    if (!options.sanitizer) {
        options.sanitizer = require('../sanitizer')(null);
    }

    if (!R.isEmpty(options.attributeMappings)) {
        options.
        attrNameProcessors.
        splice(
            1,
            0,
            require('./processors/attribute-mapper')(options.attributeMappings)
        );
    }

    return options;
};

