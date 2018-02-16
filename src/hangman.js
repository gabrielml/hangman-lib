function newGame(words) {
    const position = Math.floor(Math.random() * words.length);
    const word = words[position];

    return {
        tries: 10,
        hits: [],
        word,
        guess(letter) {
            // Is game finished?
            if(this.result === 0 || this.result === 1){
                throw new Error(`Game is already finished!`);
            }
            // Is it a hit or a miss?
            if (this.word.includes(letter)) {
                this.hits.push(letter);
            } else {
                this.tries--;
            }
            // Has he won?
            if (this.hits.length === unique(this.word).length) {
                this.result = 1;
            }
            // Has he lost?
            if (this.tries === 0) {
                this.result = 0;
            }
        }
    };
}

function unique(word) {
    return Array.from(new Set(word));
}

exports.newGame = newGame;

exports.unique = unique;