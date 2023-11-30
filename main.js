class Game {
    constructor() {
        this.board = new Array(9).fill(null);
        this.turn = "X";
    }

    makeMove(index) {
        if(this.endOfGame()) return;
        if(this.board[index]) return;

        this.board[index] = this.turn;

        let winningCombo = this.findWinningCombo();
        if(!winningCombo) this.changeTurn();
        console.log('winning combo is: ', winningCombo);
    }
    
    updateView() {
        const winningCombo = this.findWinningCombo();

        for(let i = 0; i < game.board.length; i++) {
            const tile = document.querySelector(`.tile[data-index='${i}']`);
            tile.textContent = game.board[i];

            tile.classList.remove('tile-winner');
            
            //make the winning combo a diff color
            if(winningCombo && winningCombo.includes(i)) {
                tile.classList.add('tile-winner');
            }
        }

    }
    
    switchColorTurn() {
        const playerX = document.querySelector('.player-x');
        const playerO = document.querySelector('.player-o');
    
    
        if(this.turn == 'X') {
            playerX.classList.add('player-x-active');
            playerO.classList.remove('player-o-active');
        } else if( this.turn = 'O') {
            playerX.classList.remove('player-x-active');
            playerO.classList.add('player-o-active');
        }
    }

    changeTurn() {
        this.turn == "X" ? this.turn = "O" : this.turn = "X";
        this.switchColorTurn();
    }

    findWinningCombo() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for(const combo of winningCombos) {
            const [a, b, c] = combo;
            if(this.board[a] && ((this.board[a] == this.board[b]) && (this.board[a] == this.board[c]))) {
                return combo;
            }
        }
        return null;
    }

    endOfGame() {
        let winningCombo = this.findWinningCombo();
        if(winningCombo) {
            return true;
        } else {
            return false;
        }
    }
}

let game = new Game();

const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => tile.addEventListener('click', () => {
    game.makeMove(tile.dataset.index);
    game.updateView();
}));

const restartBtn = document.querySelector('.restart-game');
restartBtn.addEventListener('click', function() {
    const playerX = document.querySelector('.player-x');
    const playerO = document.querySelector('.player-o');
    playerX.classList.add('player-x-active');
    playerO.classList.remove('player-o-active');

    game = new Game();
    game.updateView();
});