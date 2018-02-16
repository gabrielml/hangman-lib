const hangman = require('./hangman');
const newGame = hangman.newGame;
const unique = hangman.unique;

const words = ['foo', 'bar', 'baz'];

describe('newGame()', () => {
    // Test
    it('creates a new game with word from list', () => {
        // Act
        const game = newGame(words);

        // Assert
        expect(game).toEqual({
            tries: 10,
            hits: [],
            word: jasmine.any(String),
            guess: jasmine.any(Function)
        });
        expect(words.includes(game.word)).toBe(true);
    });
});

describe('game.guess()', () => {
    it('adds a new hit when the letter exists', () => {
        // Arrange
        const game = newGame(words);
        const letter = game.word[0];

        // Act
        game.guess(letter);

        // Assert
        expect(game).toEqual({
            tries: 10,
            hits: [letter],
            word: jasmine.any(String),
            guess: jasmine.any(Function)
        });
    });

    it('subtracts a try when the letter does not exist', () => {
        // Arrange
        const game = newGame(words);
        const letter = 'g';

        // Act
        game.guess(letter);

        // Assert
        expect(game).toEqual({
            tries: 9,
            hits: [],
            word: jasmine.any(String),
            guess: jasmine.any(Function)
        });
    });

    it('changes result to 1 when last letter is guessed', () => {
        // Arrange
        const game = newGame(words);
        game.word = 'bar';
        game.hits = ['b', 'a'];
        const letter = 'r';

        // Act
        game.guess(letter);

        // Assert
        expect(game).toEqual({
            tries: 10,
            hits: ['b', 'a', 'r'],
            result: 1,
            word: jasmine.any(String),
            guess: jasmine.any(Function)
        });
    });

    it('changes result to 0 when last try is used', () => {
        // Arrange
        const game = newGame(words);
        game.word = 'bar';
        game.hits = ['b', 'a'];
        game.tries = 1;
        const letter = 'z';

        // Act
        game.guess(letter);

        // Assert
        expect(game).toEqual({
            tries: 0,
            hits: ['b', 'a'],
            result: 0,
            word: jasmine.any(String),
            guess: jasmine.any(Function)
        });
    });

    it('supports repeated letters', () => {
        // Arrange
        const game = newGame(words);
        game.word = 'foo';
        game.hits = ['f'];
        const letter = 'o';

        // Act
        game.guess(letter);

        // Assert
        expect(game).toEqual({
            tries: 10,
            hits: ['f', 'o'],
            result: 1,
            word: jasmine.any(String),
            guess: jasmine.any(Function)
        });
    });

    it(`throws exception when game is finished`, () => {
        // Arrange
        const game = newGame(words);
        game.word = 'foo';
        game.hits = ['f', 'o'];
        game.result = 1;
        const letter = 'x';

        // Act
        expect(() => game.guess(letter)).toThrow(`Game is already finished!`);
    });
});

describe('unique()', () => {
    it('returns the unique letters of a word', () => {
        expect(unique('bar')).toEqual(['b', 'a', 'r']);
        expect(unique('foo')).toEqual(['f', 'o']);
    });
});
