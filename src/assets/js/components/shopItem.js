var Ractive = require('ractive');
var postal = require('postal.js');
var channel = postal.channel('shop');

Ractive.components.shopItem = Ractive.extend({
    template: require('./shopItem.html'),
    oninit: function () {
        this.on('addItem', function () {
            channel.publish({
                topic: 'cart.addItem',
                data: {
                    name: this.get('name'),
                    price: this.get('price')
                }
            });
        });
        this.on('playSound', function () {
            channel.publish({
                topic: 'playSound',
                data: {
                    
                }
            });
        });
    }
});
