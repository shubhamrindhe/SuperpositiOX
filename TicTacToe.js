// Author : Shubham Rindhe
// github : github.com/shubhamrindhe


class TicTacToe {

	constructor(){
		this.board = Array.from(Array(9).keys());
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
	
	checkTie(){
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
			return {score:-1};
		if(this.check_win(mark.player))
			return {score: 1};
		if(this.checkTie())
			return {score: 0};	

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
	
	
	
	
}


	





var t = new TicTacToe()
t.board[0] = 'X';
/*
t.board[4] = 'X';
t.board[5] = 'X';
*/


console.log(t.empty_cells());
console.log(t.get_cells('X'));
console.log(t.check_win('X'));
console.log(t.minimax(true,{player:'O',rival:'X'}));
//console.log(minimax(t.board,true,{player:'O',rival:'X'}));