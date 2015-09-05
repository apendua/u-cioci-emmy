var Ractive = require('ractive'),
    postal = require('postal.js');

Ractive.components.welcomeScreen = Ractive.extend({
    template: require('./welcomeScreen.html'),

    onrender: function() {
        this.initializeSubscription();
    },

    initializeSubscription: function() {
        var self = this;
        postal.subscribe({
            channel: 'game',
            topic: 'welcome',
            callback: function() {
                self.set('opened', true);
            }
        });

        postal.subscribe({
            channel: 'game',
            topic: 'start',
            callback: function() {
                self.set('opened', false);
            }
        });
    }
});
