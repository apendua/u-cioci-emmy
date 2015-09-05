/**
 * That's bootstrap of your application
 */

require('./components');

var Ractive = require('ractive');
var postal = require('postal.js');
var _ = require('lodash');
var shopChannel = postal.channel('shop');

window.postal = postal;

require('./config/audio');

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

var AudioQueue = require('./services/audioQueue');

var interfaceAudio = null;

// Mouse hover events
document.body.addEventListener('mouseover', function(e) {
    if (e.target.hasAttribute('data-audio')) {
        if (interfaceAudio) {
            interfaceAudio.stop();
        }

        interfaceAudio = AudioQueue.simpleAudio(e.target.getAttribute('data-audio'), function() {
            interfaceAudio = null;
        });
    }
}, false);

document.body.addEventListener('mouseout', function(e) {
    if (e.target.hasAttribute('data-audio')) {
        if (interfaceAudio) {
            interfaceAudio.stop();
        }

        interfaceAudio = null;
    }
}, false);

// Mobile events
var REQUIRED_TAP_TIME = 500;

var tappedElement = null,
    tapTimeout = null;

document.body.addEventListener('touchstart', function(e) {
    tappedElement = e.target;

    clearTimeout(tapTimeout);

    if (e.target.hasAttribute('data-audio')) {
        tapTimeout = setTimeout(function() {
            if (interfaceAudio) {
                interfaceAudio.stop();
            }

            interfaceAudio = AudioQueue.simpleAudio(e.target.getAttribute('data-audio'), function() {
                interfaceAudio = null;
            });
        }, REQUIRED_TAP_TIME);
    }
}, false);

document.body.addEventListener('touchend', function() {
    clearTimeout(tapTimeout);
    tappedElement = null;

    if (interfaceAudio) {
        interfaceAudio.stop();
    }
}, false);


//var a = Ractive.defaults.data.audio;
//
//new AudioQueue([
//    a['2'],
//    a.MORE_PIECES,
//    a.BANANA
//]).start();

// Audio queue TEST!!! :D
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
