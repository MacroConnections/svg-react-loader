var XMLNS_REGEX = /^xmlns(Xlink)?$/;

module.exports = function removeXmlnsProps () {
    var path    = this.path;
    var key     = path[path.length - 1];
    var isXmlns = XMLNS_REGEX.test(key);

    if (this.isLeaf && isXmlns) {
        this.delete();
    }
};
