var Ractive = require('ractive'),
    postal = require('postal.js'),
    AudioQueue = require('../services/audioQueue'),
    audio = require('../config/audio');

Ractive.components.readListButton = Ractive.extend({
    template: require('./readListButton.html'),

    oninit: function() {
        this.on('readList', this.readList.bind(this));
    },

    readList: function() {
        console.log('Read list!');
        if (this.queue) {
            this.queue.stop();
        }

        this.queue = new AudioQueue([], 0);

        this.queue.addTrack(audio.SHOPPING_LIST);

        var list = this.get('items');

        for (var i = 0; i < list.length; i++) {
            this.queue.addTrack(audio[list[i].count]);
            this.queue.addTrack(list[i].count == 1 ? audio.ONE_PIECE : audio.MORE_PIECES);
            this.queue.addTrack(list[i].audio);
        }

        this.queue.start();
    }
});
