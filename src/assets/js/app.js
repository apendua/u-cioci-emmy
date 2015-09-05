/**
 * That's bootstrap of your application
 */

var Ractive = require('ractive');

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('../templates/app.html')
});
