/**
 * That's bootstrap of your application
 */

require('./components');

var Ractive = require('ractive');
var postal = require('postal.js');

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('./app.html'),
    data: {
        itemsToBuy: [
            { name: 'jabłko' },
            { name: 'banan' },
            { name: 'papryka' },
        ],
        itemsInShop: [
            { name: 'jabłko' },
            { name: 'banan' },
            { name: 'papryka' },
        ],
        itemsInCart: [
        ],
    }
});

postal.subscribe({
    channel: 'shop',
    topic: 'addItem',
    callback: function (data) {
        ractive.push('itemsInCart', data);
    }
});
