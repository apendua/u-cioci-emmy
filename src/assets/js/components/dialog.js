var Ractive = require('ractive');

Ractive.components.dialog = Ractive.extend({
    template: require('./dialog.html'),

    open: function() {
        this.set('opened', true);
    },

    close: function() {
        this.set('opened', false);
    }
});
