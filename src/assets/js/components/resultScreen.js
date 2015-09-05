var Ractive = require('ractive'),
    postal = require('postal.js');

Ractive.components.resultScreen = Ractive.extend({
    template: require('./resultScreen.html'),

    onrender: function() {
        this.initializeSubscription();
        this.on('selectLevel', this.selectAnotherLevel.bind(this));
    },

    selectAnotherLevel: function() {
        postal.publish({
            channel: 'game',
            topic: 'welcome'
        });
    },

    initializeSubscription: function() {
        var self = this;

        postal.subscribe({
            channel: 'game',
            topic: 'welcome',
            callback: function() {
                self.set('opened', false);
            }
        });

        postal.subscribe({
            channel: 'game',
            topic: 'result',
            callback: function() {
                self.set('loading', false);
                self.set('opened', true);
            }
        });

        postal.subscribe({
            channel: 'game',
            topic: 'request',
            callback: function() {
                self.set('loading', true);
            }
        });

        postal.subscribe({
            channel: 'game',
            topic: 'start',
            callback: function() {
                self.set('loading', false);
                self.set('opened', false);
            }
        });
    }
});
