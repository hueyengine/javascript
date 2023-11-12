function getSong() {
    let _song = '';
    let i = 100;
    for (i; i > 0; i -= 1) {
        /* eslint-disable no-loop-func */
        setTimeout(function () {
            _song += `${i} beers on the wall, you take one down and pass it around, ${i - 1
                } bottles of beer on the wall\n`;
            if (i === 1) {
                _song += "Hey let's get some more beer";
            }
        }, 0);
        /* eslint-enable no-loop-func */
    }

    return _song;
}

function singSong(_song) {
    if (!_song) throw new Error("song is '' empty, FEED ME A SONG!");
    console.log(_song);
}

const song = getSong('beer');
// this will not work
singSong(song);
  // Uncaught Error: song is '' empty, FEED ME A SONG!
