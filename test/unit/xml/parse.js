/*globals describe, it*/
require('should');

describe('svg-react-loader/lib/xml', () => {
    const read = require('../../../lib/util/read-file');

    it('should parse simple xml correctly', (done) => {
        const xmlParser = require('../../../lib/xml/parse')(null);

        read('test/samples/simple.svg').
            flatMap(xmlParser).
            subscribe(
                (result) => {
                    result.
                        should.
                        eql({
                            "props": {
                                "version": "1.1",
                                "x": "0px",
                                "y": "0px",
                                "viewbox": "0 0 16 16",
                                "enableBackground": "new 0 0 16 16",
                                "xmlns": "http://www.w3.org/2000/svg",
                                "xmlnsXlink": "http://www.w3.org/1999/xlink",
                                "xmlSpace": "preserve",
                                "className": "simple"
                            },
                            "tagname": "svg",
                            "children": [
                                {
                                    "props": {
                                        "x": "0",
                                        "y": "0",
                                        "width": "16",
                                        "height": "16",
                                        "fill": "#fff"
                                    },
                                    "tagname": "rect"
                                }
                            ]
                        });
                },
                (error) => { throw error; },
                done
            );
    });

    it('should parse text in xml correctly', (done) => {
        const sanitizer = require('../../../lib/sanitizer')({
            filters: [
                require('../../../lib/sanitizer/filters/normalize-node')(null),
                require('../../../lib/sanitizer/filters/underscore-to-children')(null)
            ]
        });
        const xmlParser = require('../../../lib/xml/parse')({ sanitizer });

        read('test/samples/text.svg').
            flatMap(xmlParser).
            subscribe(
                (result) => {
                    console.log(JSON.stringify(result, null, 4));
                },
                (error) => { throw error; },
                done
            );
    });

    it.only('should parse styles in xml correctly', (done) => {
        const sanitizer = require('../../../lib/sanitizer')({
            filters: [
                require('../../../lib/sanitizer/filters/normalize-node')(null),
                require('../../../lib/sanitizer/filters/underscore-to-children')(null)
            ]
        });
        const xmlParser = require('../../../lib/xml/parse')({ sanitizer });

        read('test/samples/styles.svg').
            flatMap(xmlParser).
            subscribe(
                (result) => {
                    console.log(JSON.stringify(result, null, 4));
                },
                (error) => { throw error; },
                done
            );
    });
});
