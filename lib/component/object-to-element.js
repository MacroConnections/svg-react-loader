module.exports = function objectToElement (obj, iterating) {
    var isString = typeof obj === 'string';

    if (isString) {
        return JSON.stringify(obj);
    }

    var result = 'React.createElement(' + JSON.stringify(obj.tagname);
    var props = 'props';

    if (!iterating) {
        props =
            obj.props ?
                'merge(' + JSON.stringify(obj.props) + ',props)' :
                props;
    }
    else {
        props = JSON.stringify(obj.props || null);
    }

    result += ',' + props;

    if (obj.children && obj.children.length) {
        var children =
                obj.
                children.
                map(function (child) {
                    return objectToElement(child, true);
                }).
                join(',');

        result += ',[' + children + ']';
    }

    result += ')';

    return result;
};

