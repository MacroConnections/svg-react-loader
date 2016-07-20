module.exports = function objectToElement (obj) {
    var result =
        'React.createElement(' +
        JSON.stringify(obj.tagname) + ',' +
        JSON.stringify(obj.props);

    if (obj.children && obj.children.length) {
        result += ',[' + obj.children.map(objectToElement).join(',') + ']';
    }

    result += ')';

    return result;
};

