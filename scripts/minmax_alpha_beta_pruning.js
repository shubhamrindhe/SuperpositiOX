var Heuristic_Array = [
	[     0,   -10,  -100, -1000 ],
	[    10,     0,     0,     0 ],
	[   100,     0,     0,     0 ],
	[  1000,     0,     0,     0 ]
];	

function evaluatePosition(board,player) {
	var opponent = (player == 'X') ? 'O' : 'X', piece;
	var players, others, t = 0, i, j; 
	for (i = 0; i < 8; i++)  {
		players = others = 0;
		for (j = 0; j < 3; j++)  {
			piece = board[TicTacToe.winning_combinations()[i][j]];
			if (piece == player)
				players++;
			else if (piece == opponent)
				others++;
		}
		t += Heuristic_Array[players][others];
	}
	return t;
}

var TicTacToe_winning_combinations = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
			
	[0,3,6],
	[1,4,7],
	[2,5,8],	
		
	[0,4,8],
	[2,4,6]
];

function empty_cells(list){
	return list.filter( s => typeof s == 'number' );
}
	
function check_tie(_){
	if((empty_cells(_).length)==0)
		return true;
	else
		return false;	
}
	
function check_win(_,player){
	let plays = _.reduce( (a,e,i) => ( (e === player) ? a.concat(i) : a ) , [] );			
	let gamewin = null;

	for(let [index,combo] of TicTacToe_winning_combinations.entries()){
		if( combo.every(elem=>plays.indexOf(elem)>-1) ){
			gamewin = {
				index : index,
				player : player
			};
			break;
		}	
	}
	return gamewin;
}
function minmax(board,player,alpha=-Infinity,beta=Infinity,level=2){
	var avail_spots = empty_cells(board);
	if(checkWin(board,hooman))
		//return {score:evaluatePosition(board,player)};
		return {score:-1000};
	if(checkWin(board,puter))
		//return {score:evaluatePosition(board,player)};
		return {score: 1000};
	if(avail_spots.length==0)
		//return {score:evaluatePosition(board,player)};	
		return {score:0};	
	if (level == 0)
		//return {score:evaluatePosition(board,player)}; 	
		return {score:evaluatePosition(board,player)};
	
	//if (avail_spots.length == 0) 
	//	return {score:evaluatePosition(board,player)}; 
	
	/*
	var bestscore = (player==puter ? -Infinity : Infinity) ;
	var alpha_move;
	for(var i=0;i<avail_spots.length;++i){
		var move = {};
		move.index = board[avail_spots[i]];
		board[avail_spots[i]] = player;
		if(player==puter){
			var result = minmax(board,hooman,alpha,beta,level-1);
			move.score = result.score;
			if(move.score > bestscore){
				bestscore = move.score;
				alpha_move = move;
			}
			alpha = Math.max(alpha,bestscore);
			if(beta<=alpha){
				board[avail_spots[i]] = move.index;
				break;
			}
		}else{
			var result = minmax(board,puter,alpha,beta,level-1);
			move.score = result.score;
			if(move.score < bestscore){
				bestscore = move.score;
				alpha_move = move;
			}
			beta = Math.min(alpha,bestscore);
			if(beta<=alpha){
				board[avail_spots[i]] = move.index;
				break;
			}
		}
		board[avail_spots[i]] = move.index;
	}
	return alpha_move;
	*/
	
	
	
	
	

	if(player){
		empty_cells(_).forEach(function (cell,index) {
			var move = {};
			//move.index = board[cell];
			move.index = cell;
			_[cell] = mark.player;
			var result = minimax(_,false,mark);
			move.score = result.score;
			_[cell] = cell;
			if(move.score > bestscore){
				bestscore = move.score;
				alpha_move = move;
				
				
			}
			var mov = {
				board : _.slice(),
				player : mark.player,
				rival : mark.rival,
				move : move.index,
				score : move.score
			}
			//if(all_moves.indexOf(mov)==-1)
				all_moves_2.push(mov);
			
		});
	}else{
		empty_cells(_).forEach(function (cell,index) {
			var move = {};
			//move.index = board[cell];
			move.index = cell;
			_[cell] = mark.rival;			
			var result = minimax(_,true,mark);
			move.score = result.score;
			_[cell] = cell;
			if(move.score < bestscore){
				bestscore = move.score;
				alpha_move = move;
			}
			var mov = {
				board : _.slice(),
				player : mark.rival,
				rival : mark.player,
				move : move.index,
				score : move.score
			}
			//if(all_moves.indexOf(mov)==-1)
				all_moves_1.push(mov);
			
		});
	}
	//return alpha_move;
}
