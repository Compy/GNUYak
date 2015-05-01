if ( !Storage.prototype.setObject ) {
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    }
}

if ( !Storage.prototype.getObject ) {
    Storage.prototype.getObject = function(key) {
        var value = this.getItem(key);
        return value && JSON.parse(value);
    }
}
