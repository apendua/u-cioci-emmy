var Ractive = require('ractive');
var postal = require('postal.js');
var channel = postal.channel('shop');

Ractive.components.shopItem = Ractive.extend({
    template: require('./shopItem.html'),
    oninit: function () {
        this.on('addItem', function () {
            var available = this.get('available');
            if (available <= 0) {
                return;
            }
            channel.publish({
                topic: 'cart.addItem',
                data: {
                    name: this.get('name'),
                    price: this.get('price'),
                    id: this.get('id'),
                    photo: this.get('photo')
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
    },
});
