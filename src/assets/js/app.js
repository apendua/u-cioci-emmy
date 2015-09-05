/**
 * That's bootstrap of your application
 */

require('./components');

var Ractive = require('ractive');
var postal = require('postal.js');
var _ = require('lodash');
var shopChannel = postal.channel('shop');

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('./app.html'),
    modifyArrays: false,
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

shopChannel.subscribe({
    topic: 'cart.addItem',
    callback: function (data) {
        ractive.push('itemsInCart', data);
    }
});

shopChannel.subscribe({
    topic: 'cart.removeItem',
    callback: function (data) {
        // NOTE: ideally this should work, put ractive has problems with that ...
        // ractive.splice('itemsInCart', data.index, 1);
        ractive.set('itemsInCart.' + data.index + '.removed', true);
    },
});
