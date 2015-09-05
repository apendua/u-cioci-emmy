(function() {
    'use strict';

    function AudioQueue(tracks, delay) {
        this.delay = delay === void 0 ? 300 : delay;
        this.tracks = tracks || [];
    };

    AudioQueue.prototype.setDelay = function(delay) {
        this.delay = delay;
    };

    AudioQueue.prototype.addTrack = function(url, startCallback, finishCallback) {
        this.tracks.push({
            url: url,
            onStart: startCallback,
            onFinish: finishCallback
        });
    };

    AudioQueue.prototype.start = function() {
        if (this.isStarted) {
            this.stop();
        }

        this.isStarted = true;
        this.currentQueue = [].slice.call(this.tracks);
        this.playNext();
    };

    AudioQueue.prototype.playNext = function() {
        var next = this.currentQueue.shift(),
            self = this;

        if (!next) {
            return this.stop();
        }

        this.currentTrack = next;
        this.audioElement = document.createElement('audio');
        this.audioElement.setAttribute('autoplay', 'autoplay');
        this.audioElement.setAttribute('src', next.url);

        var lastTime = Date.now();

        var onPlay = function() {
            var timeLeft = Date.now() - lastTime + self.delay;
            if (timeLeft > 10) {
                self.audioElement.pause();
                setTimeout(function() {
                    if (self.isStarted) {
                        self.currentTrack.onStart && self.currentTrack.onStart();
                        self.audioElement.removeEventListener('play', onPlay);
                        self.audioElement.play();
                    }
                }, timeLeft);
                return;
            }

            self.currentTrack.onStart && self.currentTrack.onStart();
        };
        this.audioElement.addEventListener('play', onPlay);

        this.audioElement.addEventListener('ended', function() {
            if (self.currentTrack.onFinish) {
                self.currentTrack.onFinish();
            }

            self.playNext();
        });
    };

    AudioQueue.prototype.stop = function() {
        if (!this.isStarted) {
            return;
        }

        this.isStarted = false;

        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.removeAttribute('src');
            this.audioElement.parentNode && this.audioElement.parentNode.removeChild(this.audioElement);
            this.audioElement = null;
        }
    };

    module.exports = AudioQueue;
}());
