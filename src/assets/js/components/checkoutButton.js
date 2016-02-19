var Ractive = require('ractive');
var postal = require('postal.js');

Ractive.components.checkoutButton = Ractive.extend({
    template: require('./checkoutButton.html'),
    oninit: function () {
        this.on('buy', function () {
            var victory = this.get('goalReached') && !this.get('notEnoughMoney');
            postal.publish({
                channel: 'game',
                topic: 'result',
                data: {
                    victory: victory
                }
            });
            console.log('VICTORY', victory);
        });
    },
});
