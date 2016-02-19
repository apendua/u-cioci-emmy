var Ractive = require('ractive');

Ractive.components.shoppingList = Ractive.extend({
    template: require('./shoppingList.html'),

    oninit: function() {
        var self = this;
        this.on('toggleList', function() {
            self.set('text', !self.get('text'));
        });
    }
});
