var Ractive = require('ractive'),
    postal = require('postal.js'),
    AudioQueue = require('../services/audioQueue'),
    audio = require('../config/audio');

var resultScreenCongratulations = null;
Ractive.components.resultScreen = Ractive.extend({
    template: require('./resultScreen.html'),

    onrender: function() {
        this.initializeSubscription();
        this.on('selectLevel', this.selectAnotherLevel.bind(this));
        this.on('replay', this.replay.bind(this));

        this.playCongratulations();
    },
    
    playCongratulations: function() {
        if (this.get('opened')) {
            if (resultScreenCongratulations) {
                resultScreenCongratulations.stop();
            }

            resultScreenCongratulations = AudioQueue.simpleAudio(audio.CONGRATULATIONS);
            resultScreenCongratulations.start();
        }
    },

    replay: function() {
        postal.publish({
            channel: 'game',
            topic: 'replay'
        });
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
            callback: function(victory) {
                self.set('loading', false);
                self.set('opened', true);
                self.set('victory', victory.victory);
                self.playCongratulations();
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
