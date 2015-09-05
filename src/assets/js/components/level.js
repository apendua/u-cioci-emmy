var Ractive = require('ractive'),
    postal = require('postal.js');

Ractive.components.level = Ractive.extend({
    template: require('./level.html'),

    onrender: function() {
        this.initializeBehavior();
    },

    initializeBehavior: function() {
        var self = this;
        this.el.addEventListener('click', function(e) {
            e.preventDefault();

            postal.publish({
                channel: 'game',
                topic: 'request',
                data: {
                    difficulty: self.get('type')
                }
            });

            // setTimeout(function() {
            //     postal.publish({
            //         channel: 'game',
            //         topic: 'start',
            //         data: {
            //             level: self.get('type')
            //         }
            //     });
            // }, 3000);
        });
    }
});
