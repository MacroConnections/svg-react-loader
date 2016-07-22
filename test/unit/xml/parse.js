/*globals describe, it*/
require('should');

describe('svg-react-loader/lib/xml', () => {
    const xmlParser = require('../../../lib/xml/parse')(null);
    const read = require('../../../lib/util/read-file');

    it('should parse xml correctly', (done) => {
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
});
