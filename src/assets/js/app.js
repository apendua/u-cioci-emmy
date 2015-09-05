/**
 * That's bootstrap of your application
 */

require('./components');

var Ractive = require('ractive');
var postal = require('postal.js');
var _ = require('lodash');

window.postal = postal;

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('./app.html'),
    data: {
        itemsToBuy: [
            { name: 'jabłko' },
            { name: 'banan' },
            { name: 'papryka' }
        ],
        itemsInShop: [
            { name: 'jabłko' },
            { name: 'banan' },
            { name: 'papryka' }
        ],
        itemsInCart: [
        ]
    }
});

postal.subscribe({
    channel: 'shop',
    topic: 'cart.addItem',
    callback: function (data) {
        var items = ractive.get('itemsInCart');
        var index = _.findIndex(items, function(i) {
            return i.name === data.name;
        });
        if (index >= 0) {
            ractive.add('itemsInCart.' + index + '.count', 1);
        } else {
            ractive.push('itemsInCart', {
                name: data.name,
                count: 1
            });
        }
        console.log('ITEM:', items);
    }
});
