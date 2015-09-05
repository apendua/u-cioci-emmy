var Ractive = require('ractive');
var _ = require('lodash');

Ractive.components.shoppingCart = Ractive.extend({
    template: require('./shoppingCart.html'),
    data: {
        totalCost: function () {
            var items = this.get('items');
            var total = 0;
            _.each(items, function (item) {
                // TODO: use item cost and count
                total += item.count;
            });
            return total;
        }
    },
});
