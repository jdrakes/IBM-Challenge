/**
 * Create a Map Object
 */
function Map() {
    "use strict";
    this.keys = [];
    this.data = {};

    this.set = function(key, value) {
        if (this.data[key] === null || this.data[key] === undefined) {
            this.keys.push(key);
            this.data[key] = [];
        }
        this.data[key].push(value);
    };
    this.get = function(key) {
        if (typeof this.data[key] === 'undefined')
            return -1;
        return this.data[key];
    };
    this.size = function() {
        return this.keys.length;
    };
    this.isEmpty = function() {
        return this.keys.length === 0;
    };
    this.getKeys = function() {
        return this.keys;
    };
    this.remove = function(key) {
        for(k in this.keys){
            if(key === this.keys[k]){
                this.keys.splice(k,1);
                delete this.data[key];
            }
        }
    };
    this.clear = function() {
        for (var index in this.keys) {
            delete this.data[this.keys[index]];
        }
        this.keys.length = 0;
    };
    this.has = function(key) {
        return this.data.hasOwnProperty(key);
        // return _.has(this.data, key);
    };
    this.toString = function() {
        var temp = "";
        for (i = 0; i < this.keys.length; i++) {
            temp = temp + "\n" + this.keys[i] + ": " + this.data[this.keys[i]];
        }
        return temp;
    };
}