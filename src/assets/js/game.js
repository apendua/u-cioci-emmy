var postal = require('postal.js');
var defaultGame = require('./game.json');
var channel = postal.channel('game');
var currentLevel = 3;
var currentDifficulty = 'easy';
var currentGame = {};

channel.subscribe({
    topic: 'request',
    callback: function (data) {
        console.log('setting game params', data);
        if (data.difficulty) {
            currentDifficulty = data.difficulty;
        }
        if (data.level) {
            currentLevel = data.level;
        }
        currentDifficulty = data.difficulty;
        getGame(currentDifficulty, currentLevel);
    },
});

channel.subscribe({
    topic: 'replay',
    callback: function (data) {
        console.log('replay level');

        channel.publish({
            topic: 'request',
            data: {
                difficulty: currentDifficulty
            }
        });
    },
});

channel.subscribe({
    topic: 'nextLevel',
    callback: function (data) {
        console.log('next level');
        currentLevel += 1;
        getGame(currentDifficulty, currentLevel);
    },
});

function getGame (difficulty, level) {

    // TODO: do not get again if you're currently loading data ...
    
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        try {
            currentGame = JSON.parse(this.responseText);
        } catch (err) {
            console.error(err);
            // better this then nothing ...
            currentGame = defaultGame;
        }
        startGame();
    });
    xhr.addEventListener("error", function () {
        console.log('ERROR');
        startGame(defaultGame);
    });
    xhr.open("GET", "/game/" + difficulty + "/" + level + "/", true);
    xhr.send();
}

function startGame(gameData) {
    if (gameData) {
        currentGame = gameData;
    }
    channel.publish({
        topic: 'start',
        data: currentGame
    });
}
