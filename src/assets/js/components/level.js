var Ractive = require('ractive'),
    postal = require('postal.js');

Ractive.components.level = Ractive.extend({
    template: require('./level.html'),

    onrender: function() {
        this.on('setLevel', this.setLevel.bind(this));
    },

    setLevel: function() {
        postal.publish({
            channel: 'game',
            topic: 'request',
            data: {
                difficulty: this.get('type')
            }
        });
    }
});
