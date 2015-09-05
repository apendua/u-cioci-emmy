var Ractive = require('ractive');
var postal = require('postal.js');
var channel = postal.channel('shop');

Ractive.components.shoppingCartItem = Ractive.extend({
    template: require('./shoppingCartItem.html'),
    oninit: function () {
        this.on('removeItem', function () {
            channel.publish({
                topic: 'cart.removeItem',
                data: {
                    index: this.get('index')
                }
            });
        });
    }
});
