var Ractive = require('ractive');

if (!Ractive.defaults.data) {
    Ractive.defaults.data = {};
}

function audio(audio) {
    return 'http://uciociemmy.s3.amazonaws.com/static_audio/' + audio;
}

Ractive.defaults.data.audio = {
    REMOVE_FROM_CART: audio('usun_z_koszyka.mp3'),
    ADD_TO_CART: audio('dodaj_do_koszyka.mp3'),
    CART: audio('koszyk.mp3'),
    BUY: audio('kup.mp3'),
    SHOPPING_LIST: audio('lista_zakupow.mp3'),
    GAME_EXPLANATION: audio('wyjasnienie_gry.mp3'),
    SHELVES: audio('polki_sklepowe.mp3'),
    ONE_PIECE: audio('raz.mp3'),
    MORE_PIECES: audio('razy.mp3'),

    '1': audio('1.mp3'),
    '2': audio('2.mp3'),
    '3': audio('3.mp3'),
    '4': audio('4.mp3'),
    '5': audio('5.mp3')
};
