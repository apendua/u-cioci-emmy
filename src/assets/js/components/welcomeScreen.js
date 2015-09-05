var Ractive = require('ractive'),
    postal = require('postal.js'),
    AudioQueue = require('../services/audioQueue');

Ractive.components.welcomeScreen = Ractive.extend({
    template: require('./welcomeScreen.html'),

    onrender: function() {
        this.initializeSubscription();

        this.INTRODUCTION_TIME = 7000;

        if (this.get('opened')) {
            this.initializeIntroduction();
        }
    },

    rejectIntroduction: function() {
        clearTimeout(this.introductionTimeout);
    },

    playIntroduction: function() {
        if (this.introductionAudio) {
            this.introductionAudio.stop();
        }

        this.introductionAudio = AudioQueue.simpleAudio(require('../config/audio').INTRODUCTION).start();
    },

    initializeIntroduction: function() {
        var self = this;

        this.rejectIntroduction();

        this.introductionTimeout = setTimeout(function() {
            self.playIntroduction();
            self.INTRODUCTION_TIME += 2000;
        }, this.INTRODUCTION_TIME);
    },

    initializeSubscription: function() {
        var self = this;

        postal.subscribe({
            channel: 'game',
            topic: 'welcome',
            callback: function() {
                self.set('opened', true);
                self.initializeIntroduction();
            }
        });

        postal.subscribe({
            channel: 'game',
            topic: 'request',
            callback: function() {
                self.set('loading', true);
                self.rejectIntroduction();
            }
        });

        postal.subscribe({
            channel: 'game',
            topic: 'start',
            callback: function() {
                self.set('loading', false);
                self.set('opened', false);
                self.rejectIntroduction();
            }
        });
    }
});
