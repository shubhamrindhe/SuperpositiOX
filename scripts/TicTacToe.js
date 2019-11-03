// Author : Shubham Rindhe
// github : github.com/shubhamrindhe

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


class TicTacToe {

	constructor(){
		this.board = Array.from( Array(9).keys() );
	}
	
	static winning_combinations(){
		return [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			
			[0,3,6],
			[1,4,7],
			[2,5,8],
			
			[0,4,8],
			[2,4,6]
		];
	}

	new_board(){
		this.board = Array.from(Array(9).keys());
	}
	empty_cells(){
		return this.board.filter( s => typeof s == 'number' );
	}
	
	get_cells(player){
		return this.board.reduce( (a,e,i) => ( (e === player) ? a.concat(i) : a ) , [] );
	}
	
	check_tie(){
		if(this.empty_cells().length==0)
			return true;
		else
			return false;	
	}
	
	check_win(player){
		//let plays = this.board.reduce( (a,e,i) => ( (e === player) ? a.concat(i) : a ) , [] );			
		let plays = this.get_cells(player);			
		let game_win = null;

		for(let [index,combo] of TicTacToe.winning_combinations().entries()){
			if( combo.every(elem=>plays.indexOf(elem)>-1) ){
				game_win = {
					index : index,
					player : player
				};
				break;
			}	
		}
		return game_win;
	}
	
	mark(cell,player){
		if(typeof this.board[cell] == 'number'){
			this.board[cell] = player;
			return true;
		}else{
			return false;
		}
	}
	
	
	minimax(player,mark){		
		if(this.check_win(mark.rival))
			return {score:-1,index:-1};
		if(this.check_win(mark.player))
			return {score: 1,index:-1};
		if(this.check_tie())
			return {score: 0,index:-1};	

		var bestscore = ( player ? -Infinity : Infinity ) ;
		var alpha_move;	
		
		var avail_spots = this.empty_cells();
		if(player){
			for(var i=0;i<avail_spots.length;++i){	
				var move = {};
				//move.index = board[cell];
				move.index = avail_spots[i];
				this.board[avail_spots[i]] = mark.player;
				var result = this.minimax(false,mark);
				move.score = result.score;
				this.board[avail_spots[i]] = avail_spots[i];
				if(move.score > bestscore){
					bestscore = move.score;
					alpha_move = move;
				}
			}
		}else{
			for(var i=0;i<avail_spots.length;++i){	
				var move = {};
				//move.index = board[cell];
				move.index = avail_spots[i];
				this.board[avail_spots[i]] = mark.rival;			
				var result = this.minimax(true,mark);
				move.score = result.score;
				this.board[avail_spots[i]] = avail_spots[i];
				if(move.score < bestscore){
					bestscore = move.score;
					alpha_move = move;
				}		
			}
		}
		return alpha_move;	
	}
	
	static minimax(ttt,player,mark){		
		if(ttt.check_win(mark.rival))
			return {score:-1,index:-1};
		if(ttt.check_win(mark.player))
			return {score: 1,index:-1};
		if(ttt.check_tie())
			return {score: 0,index:-1};	

		var bestscore = ( player ? -Infinity : Infinity ) ;
		var alpha_move;	
		
		var avail_spots = ttt.empty_cells();
		if(player){
			for(var i=0;i<avail_spots.length;++i){	
				var move = {};
				//move.index = board[cell];
				move.index = avail_spots[i];
				ttt.board[avail_spots[i]] = mark.player;
				var result = TicTacToe.minimax(ttt,false,mark);
				move.score = result.score;
				ttt.board[avail_spots[i]] = avail_spots[i];
				if(move.score > bestscore){
					bestscore = move.score;
					alpha_move = move;
				}
			}
		}else{
			for(var i=0;i<avail_spots.length;++i){	
				var move = {};
				//move.index = board[cell];
				move.index = avail_spots[i];
				ttt.board[avail_spots[i]] = mark.rival;			
				var result = TicTacToe.minimax(ttt,true,mark);
				move.score = result.score;
				ttt.board[avail_spots[i]] = avail_spots[i];
				if(move.score < bestscore){
					bestscore = move.score;
					alpha_move = move;
				}		
			}
		}
		return alpha_move;	
	}	
}


function create_grid(list){
	return 	' '+player([0])+' | '+player([1])+' | '+player([2])+' \n'+
			'---+---+---\n'+
			' '+player([3])+' | '+player([4])+' | '+player([5])+' \n'+
			'---+---+---\n'+
			' '+player([6])+' | '+player([7])+' | '+player([8])+' ';
}
	
function player(cell){
	return typeof cell == "string" ? cell : " " ;
}
	
function create_input(list,mark){
	var input = [];
	for(var i=0;i<list.length;++i){
		if(list[i]==mark[0])
			input.push(1);
		else if(list[i]==mark[1])
			input.push(-1);
		else
			input.push(0);
	}
	return input;
}







/*

var t = new TicTacToe();
t.board[0] = 'X';
t.board[4] = 'X';
t.board[8] = 'X';



console.log(t.empty_cells());
console.log(t.get_cells('X'));
console.log(t.check_win('X'));
console.log(t.minimax(true,{player:'O',rival:'X'}));
console.log(TicTacToe.minimax(t,true,{player:'O',rival:'X'}));
//console.log(minimax(t.board,true,{player:'O',rival:'X'}));

*/