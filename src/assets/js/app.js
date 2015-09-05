/**
 * That's bootstrap of your application
 */

require('./components');
require('./game');

var Ractive = require('ractive');
var postal = require('postal.js');
var _ = require('lodash');
var shopChannel = postal.channel('shop');
var gameChannel = postal.channel('game');

window.postal = postal;

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('./app.html'),
    modifyArrays: false,
    data: {
        itemsToBuy: [
            { name: 'jabłko' },
            { name: 'banan' },
            { name: 'papryka' }
        ],
        itemsInShop: [
            { name: 'jabłko', price: 1 },
            { name: 'banan', price: 2 },
            { name: 'papryka', price: 3 }
        ],
        itemsInCart: [
        ]
    },
    findIndexOf: function (id) {
        var items = this.get('itemsInShop');
        return _.findIndex(items, function (item) {
            return item.id === id;
        });
    },
});

shopChannel.subscribe({
    topic: 'cart.addItem',
    callback: function (data) {
        var index = ractive.findIndexOf(data.id);
        if (index >= 0) {
            ractive.add('itemsInShop.' + index + '.available', -1);
        }
        ractive.push('itemsInCart', data);
    }
});

shopChannel.subscribe({
    topic: 'cart.removeItem',
    callback: function (data) {
        var index = ractive.findIndexOf(data.id);
        if (index >= 0) {
            ractive.add('itemsInShop.' + index + '.available', 1);
        }
        // NOTE: ideally this should work, put ractive has problems with that ...
        // ractive.splice('itemsInCart', data.index, 1);
        ractive.set('itemsInCart.' + data.index + '.removed', true);
    },
});

gameChannel.subscribe({
    topic: 'start',
    callback: function (data) {
        _.each(data.available_items, function (item) {
            item.available = data.items_count_limit;
        });
        ractive.set('itemsToBuy', data.shopping_list);
        ractive.set('itemsInShop', data.available_items);
        ractive.set('budget', data.budget);
        ractive.set('scenario', data.scenario);
    }
});

// Audio queue TEST!!! :D
//var AudioQueue = require('./services/audioQueue');
//
//function log(what) {
//    return function() {
//        console.log('Done', what, '!');
//    };
//}
//
//var queue = new AudioQueue([
//    { url: 'http://uciociemmy.s3.amazonaws.com/audio/banan.mp3', onStart: log('Banan'), onFinish: log('Banan end') },
//    { url: 'http://uciociemmy.s3.amazonaws.com/audio/woda.mp3', onStart: log('Woda'), onFinish: log('Woda end') },
//    { url: 'http://uciociemmy.s3.amazonaws.com/audio/ciastka.mp3', onStart: log('Ciastka'), onFinish: log('Ciastka end') },
//    { url: 'http://uciociemmy.s3.amazonaws.com/audio/banan.mp3', onStart: log('Banan 3'), onFinish: log('Banan 3 end') },
//    { url: 'http://uciociemmy.s3.amazonaws.com/audio/banan.mp3', onStart: log('Banan 4'), onFinish: log('Banan 4 end') },
//], 500);
//
//setTimeout(function() {
//    queue.start();
//}, 1000);
