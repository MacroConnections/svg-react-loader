/*globals describe, it*/
require('should');

describe('svg-react-loader/lib/component/object-to-module', () => {
    const toModule  = require('../../../lib/component/object-to-module');
    const sanitizer = require('../../../lib/sanitizer')({
        filters: [
            require('../../../lib/sanitizer/filters/text-content')(null),
            require('../../../lib/sanitizer/filters/normalize-node')(null),
            require('../../../lib/sanitizer/filters/remove-xmlns-props')(null)
        ]
    });
    const xmlParser = require('../../../lib/xml/parse')({ sanitizer });
    const read      = require('../../../lib/util/read-file');

    const expectedProps = {
        version:          "1.1",
        x:                "0px",
        y:                "0px",
        viewBox:          "0 0 16 16",
        enableBackground: "new 0 0 16 16",
        xmlSpace:         "preserve",
        className:        "simple"
    };

    it('should return the correct string for a component function', (done) => {
        read('test/samples/simple.svg').
            flatMap(xmlParser).
            map(toModule).
            subscribe(
                (result) => {
                    result.
                        should.
                        equal(
                            'var React = require(\'react\');\n' +
                            'var merge = Object.assign || function (a, b) { var r = {}, p; for (p in a) { r[p] = a[p]; } for (p in b) { r[p] = b[p]; } return r; };\n' +
                            'module.exports = function (props) { ' +
                            'return React.createElement("svg",merge(' + JSON.stringify(expectedProps) + ',props),' +
                            '[React.createElement("rect",{"x":"0","y":"0",' +
                            '"width":"16","height":"16","fill":"#fff"}),' +
                            'React.createElement("text",null,["Foobar"])' +
                            ']); };'
                        );
                },
                (error) => { throw error; },
                done
            );
    });
});
