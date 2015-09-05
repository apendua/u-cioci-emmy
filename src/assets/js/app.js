/**
 * That's bootstrap of your application
 */

require('./components');

var Ractive = require('ractive');

var ractive = new Ractive({
    el: document.getElementById('app'),
    template: require('./app.html')
});
