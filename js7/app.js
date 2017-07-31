const ticTac = (state) => {
     return Object.assign({}, {
        generate: () => {
            const board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
            let y = 0;
            board.map(function (a, y) {

                a.map(function (b, x) {
                    console.log(y, b);
//                    element(x)(y).initField(b);
                });
            });
            return board;
        },
        endGame: (color) => { return false; },
        setValue: (x, y, val) => {
            if (state[x][y] != '-') return state;
            const newState = Object.assign({}, state);
            newState[x][y] = val;
            //element(x)(y).setValue(val);
            return newState;
        },
        checkWin: () => {
            return false;
        }
    });
}
var gameType=2;
function changeTheme(){
	gameType= document.getElementById("s1").value;
	console.log(gameType);
	return true;
}

const element = (x) =>
    (y) => {
        return Object.assign({}, {
            initField: (val) => { document.getElementById('game').innerHTML += `<span id=${x}-${y}>${val}</span>` + (x == 2 ? '<br/>' : ''); },
            setValue: (val) => { document.getElementById(`${x}-${y}`).innerText = val; }
        });
    }


const Init = () => {
    if(window.localStorage.getItem('save')!=null)
	{
		return JSON.parse(window.localStorage.getItem('save'));
	}		
   
    var game = ticTac().generate();
   // element(1)(1).setValue('#');
    return {
        x: 1,
        y: 1,
        Player: 'O',
        active: true,
        gameState:game
    };;
}

const run = (_state) => {
    let state = _state
	drawTicTac({active:{x:state.x,y:state.y},board:state.gameState});
	document.getElementById('reset').addEventListener('click',function(){
		//conso
		
		window.localStorage.removeItem('save')// =undefined;          
   
		location.reload();

	});
    document.addEventListener("keydown", keyDown, false);
    function keyDown(e) {
		window.localStorage.setItem('save',JSON.stringify(state));          
   
        var keyCode = e.keyCode;
        if (keyCode == 13) {
            if (state.active && state.gameState[state.x][state.y]=='-') {
                state.active = false;
                state.gameState = ticTac(state.gameState).setValue(state.x, state.y, state.Player);
				drawTicTac({active:{x:state.x,y:state.y},board:state.gameState});
                if (ticTac( state.gameState).checkWin()) alert(`Player-${state.Player} win the game.`);
                setTimeout(function () {
                    if (state.Player == 'O') {
                        state.Player = 'X';
                    } else {
                        state.Player = 'O';
                    }
                    state.active = true;
                }, 200);
            }
        } else if (keyCode > 36 && keyCode < 41) {
			//drawTicTac({active:{x:1,state.x:state.y},board:state.gameState);
           // element(state.x)(state.y).setValue(game[state.x][state.y])

            switch (keyCode) {
                case 37: state.x > 0 ? --state.x : state.x; break;
                case 38: state.y > 0 ? --state.y : state.y; break;
                case 39: state.x < 2 ? ++state.x : state.x; break;
                case 40: state.y < 2 ? ++state.y : state.y; break;
            }
			drawTicTac({active:{x:state.x,y:state.y},board:state.gameState});
      
            //element(state.x)(state.y).setValue('#')

        }
    }

}

const drawTicTac = (state)=>{
   const can = document.getElementById('canvas1');
  const context = can.getContext('2d');
  const drawLines=()=>
  {
    var ctx = can.getContext('2d');
    var path = new Path2D('M 150,0 v 450');
    ctx.stroke(new Path2D('M 150,0 v 450'));
    ctx.stroke(new Path2D('M 300,0 v 450'));
    ctx.stroke(new Path2D('M 0,150 h 450'));
    ctx.stroke(new Path2D('M 0,300 h 450'));
  }
  const clearCanvas=()=>{context.clearRect(0, 0, 1000, 1000);}
  const drawCircle=(x,y)=>{
    var context = can.getContext('2d');
    var centerX = 150 / 2+(x*150);
    var centerY = 150 / 2 + (y*150);
    var radius = 55;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
  }
  
  const drawCross=(x,y)=>{
    const cross = can.getContext('2d');
    const img = new Image();
    img.onload = function() {
       // cross.width=100;
     //   cross.transform(0.58,0,0,0.58,(150*x),(150*y));
				console.log(x,y)
        cross.drawImage(img, 0, 0,img.width,img.height,x*150,y*150,150,150);
    }
    img.src = './exit.png';
  }
  
  const drawActiveCell=(x,y)=>{
  
  	//var c=document.getElementById("myCanvas");
	//	var ctx=context.getContext("2d");
  context.fillStyle="#aaaaaa";
		context.fillRect(x*150,y*150,150,150);
    
  }
   const drawBoard=()=>{
    const cross = can.getContext('2d');
    const img = new Image();
    img.onload = function() {
       // cross.width=100;
     //   cross.transform(0.58,0,0,0.58,(150*x),(150*y));
			
        cross.drawImage(img, 0, 0);
    }
    img.src = './game.png';
  }
    const drawCircle2=(x,y)=>{
		const cross = can.getContext('2d');
		const img = new Image();
		img.onload = function() {
		   // cross.width=100;
		 //   cross.transform(0.58,0,0,0.58,(150*x),(150*y));
				
			cross.drawImage(img, 0, 0,img.width,img.height,(90)+x*117,(90)+y*117,98,98);
		}
		img.src = './circle.png';
  }
   const drawCross2=(x,y)=>{
		const cross = can.getContext('2d');
		const img = new Image();
		img.onload = function() {
		   // cross.width=100;
		 //   cross.transform(0.58,0,0,0.58,(150*x),(150*y));
				
			cross.drawImage(img, 0, 0,img.width,img.height,(90)+x*117,(90)+y*117,98,98);
		}
		img.src = './cross2.png';
  }
 const drawActiveCell2=(x,y)=>{
  
  	//var c=document.getElementById("myCanvas");
	//	var ctx=context.getContext("2d");
		context.fillStyle="#E9B471";
		context.fillRect(90+x*117,90+y*117,98,98);
    
  }
  const run=(gameType)=>{
	  clearCanvas();  
	  if(gameType==2)
	  {
		  drawBoard();
		  setTimeout(function(){
		  drawActiveCell2(state.active.x,state.active.y)
		  Object.keys(state.board).map((key)=>{ state.board[key].map(function(element,item1){
			  
			switch(element){
				case 'O' : {drawCircle2(key,item1);break};
				case 'X' : {drawCross2(key,item1);break};
			}
      
		}) });
		  
		  },50);
	  }
	 else{
		  drawLines();
    drawActiveCell(state.active.x,state.active.y);
	Object.keys(state.board).map((key)=>{ state.board[key].map(function(element,item1){
		  
        console.log(element,item1);
      	switch(element){
        	case 'O' : {drawCircle(key,item1);break};
			case 'X' : {drawCross(key,item1);break};
        }
      
    })})
	 }
	  
	
	  /*
  	clearCanvas();
    });*/
	
  }
  return run(gameType);
}


//drawTicTac({active:{x:1,y:2},board:[['-','o','x'],['-','o','x'],['-','o','x']]})




window.onload = function() {
	
	changeTheme();
(new Promise((resolve,reject)=>{
			var game =Init();
			resolve(game);
		})).then(
			(resolve)=>{run(resolve);}
			)
		.catch(
			(err)=>{console.log(err)});
		}