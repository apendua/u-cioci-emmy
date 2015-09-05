var Ractive = require('ractive');
var _ = require('lodash');

Ractive.components.shoppingCart = Ractive.extend({
    template: require('./shoppingCart.html'),
    data: {
        totalPrice: function () {
            var items = this.get('items');
            var total = 0;
            _.each(items, function (item) {
                if (item.removed) {
                    return;
                }
                total += item.price;
            });
            return total;
        }
    },
});
