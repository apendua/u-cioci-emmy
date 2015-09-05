/**
 * That's bootstrap of your application
 */

require('./components');

var Ractive = require('ractive');
var postal = require('postal.js');

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('./app.html')
});

postal.subscribe({
    channel: 'shop',
    topic: 'addItem',
    callback: function () {
        console.log('item added');
    }
});
