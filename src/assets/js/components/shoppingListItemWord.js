var Ractive = require('ractive');
var _ = require('lodash');

Ractive.components.shoppingListItemWord = Ractive.extend({
    template: require('./shoppingListItemWord.html'),
    data: {
        icons: function (count) {
            return _.range(count);
        },
    }
});
