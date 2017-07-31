const ticTac = (state) => {
     return Object.assign({}, {
        generate: () => {
            const board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
            let y = 0;
            board.map(function (a, y) {

                a.map(function (b, x) {
                    console.log(y, b);
                    element(x)(y).initField(b);
                });
            });
            return board;
        },
        endGame: (color) => { return false; },
        setValue: (x, y, val) => {
            if (state[x][y] != '-') return state;
            const newState = Object.assign({}, state);
            newState[x][y] = val;
            element(x)(y).setValue(val);
            return newState;
        },
        getValue: (x,y) => { return state[x][y] ; },
        checkWin: () => {
            return false;
        }
    });
}

const element = (x) =>
    (y) => {
        return Object.assign({}, {
            initField: (val) => { document.getElementById('game').innerHTML += `<span id=${x}-${y}>${val}</span>` + (x == 2 ? '<br/>' : ''); },
            setValue: (val) => { document.getElementById(`${x}-${y}`).innerText = val; },
            
        });
    }


const Init = () => {
    var game = ticTac().generate();
    element(1)(1).setValue('#');
    return game;
}

const run = (game) => {
    const state = {
        x: 1,
        y: 1,
        Player: 'O',
        active: true,
        gameState:game
    };
    document.addEventListener("keydown", keyDown, false);
    function keyDown(e) {
        var keyCode = e.keyCode;
        if (keyCode == 13) {
            if (state.active && ticTac( state.gameState).getValue(state.x,state.y)=='-') {
                state.active = false;
                state.gameState = ticTac(state.gameState).setValue(state.x, state.y, state.Player);
                if (ticTac( state.gameState).checkWin()) alert(`Player-${state.Player} win the game.`);
                setTimeout(function () {
                    if (state.Player == 'O') {
                        state.Player = 'X';
                    } else {
                        state.Player = 'O';
                    }
                    state.active = true;
                }, 1000);
            }
        } else if (keyCode > 36 && keyCode < 41) {
            element(state.x)(state.y).setValue(game[state.x][state.y])

            switch (keyCode) {
                case 37: state.x > 0 ? --state.x : state.x; break;
                case 38: state.y > 0 ? --state.y : state.y; break;
                case 39: state.x < 2 ? ++state.x : state.x; break;
                case 40: state.y < 2 ? ++state.y : state.y; break;
            }
            element(state.x)(state.y).setValue('#')

        }
    }

}



window.onload = function() {
	
	
(new Promise((resolve,reject)=>{
			var game =Init();
			resolve(game);
		})).then(
			(resolve)=>{run(resolve);}
			)
		.catch(
			()=>{console.log('sth goes wrong')});
		}