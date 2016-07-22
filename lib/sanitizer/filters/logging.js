module.exports = function logging (value) {
    console.log(
        '%s %j => %j',
        this.isLeaf ? 'leafNode' : 'node',
        this.path,
        value
    );
};
