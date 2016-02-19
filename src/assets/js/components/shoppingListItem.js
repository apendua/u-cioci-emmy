var Ractive = require('ractive');
var _ = require('lodash');

Ractive.components.shoppingListItem = Ractive.extend({
    template: require('./shoppingListItem.html'),
    data: {
        icons: function (count) {
            return _.range(count);
        },
    }
});
