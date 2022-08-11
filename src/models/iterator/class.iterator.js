function* classIterator() {
    for (const key of Object.keys(this)) {
        yield this[key];
    }
}

module.exports = classIterator;
