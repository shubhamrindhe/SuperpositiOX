var stroke_width = 5;
var X = '<svg width="80" height="80" class="">\
		<line x1="20" y1="20" x2="60" y2="60" style="stroke:blue;stroke-width:5" stroke-linecap="round"/>\
		<line x1="20" y1="60" x2="60" y2="20" style="stroke:blue;stroke-width:5" stroke-linecap="round"/>\
		</svg>';	
var O = '<svg width="80" height="80" class="">\
		<circle cx="40" cy="40" r="25" stroke="red" fill="none" stroke-width="5" />\
		</svg>';
	
var hooman = 'X';
var puter = 'O';
	
var size = 9;
var Tic_Tac_Toe;
var grid;
var turn;
var winning_combos_cords = [
	{x1:0.05,y1:1/6,x2:0.95,y2:1/6},
	{x1:0.05,y1:3/6,x2:0.95,y2:3/6},
	{x1:0.05,y1:5/6,x2:0.95,y2:5/6},

	{x1:1/6,y1:0.05,x2:1/6,y2:0.95},
	{x1:3/6,y1:0.05,x2:3/6,y2:0.95},
	{x1:5/6,y1:0.05,x2:5/6,y2:0.95},

	{x1:0.05,y1:0.05,x2:0.95,y2:0.95},
	{x1:0.95,y1:0.05,x2:0.05,y2:0.95}
];
var grid_center_cords = [
	{x:1/6,y:1/6},
	{x:3/6,y:1/6},
	{x:5/6,y:1/6},

	{x:1/6,y:3/6},
	{x:3/6,y:3/6},
	{x:5/6,y:3/6},
	
	{x:1/6,y:5/6},
	{x:3/6,y:5/6},
	{x:5/6,y:5/6}
];

function index_array(n){
	return Array.from(Array(n).keys());
}
	
	
function create_svg(i){
	var win = winning_combos_cords[i];
	var w = document.getElementById('winning_move').getBoundingClientRect().width;

	return '<line x1="'+(win.x1*w)+'" y1="'+(win.y1*w)+'" x2="'+(win.x2*w)+'" y2="'+(win.y2*w)+'" style="stroke:rgba(0,0,0,0.8);stroke-width:20" stroke-linecap="round"/>';
}

function create_o(i){
	var c = grid_center_cords[i];
	var w = document.getElementById('XO').getBoundingClientRect().width;
	return '<circle cx="'+c.x*w+'" cy="'+c.y*w+'" r="'+w/(1.5*size)+'" stroke="red" fill="none" stroke-width="'+stroke_width+'" />'
}
function create_x(i){
	var c = grid_center_cords[i];
	var w = document.getElementById('XO').getBoundingClientRect().width;
	var s = w/(2*size);
	return '\
		<line x1="'+(c.x*w-s)+'" y1="'+(c.y*w-s)+'" x2="'+(c.x*w+s)+'" y2="'+(c.y*w+s)+'" style="stroke:blue;stroke-width:'+stroke_width+'" stroke-linecap="round"/>\
		<line x1="'+(c.x*w-s)+'" y1="'+(c.y*w+s)+'" x2="'+(c.x*w+s)+'" y2="'+(c.y*w-s)+'" style="stroke:blue;stroke-width:'+stroke_width+'" stroke-linecap="round"/>\
	';
}	
	
	
window.onload = function(){
	init();
	addListeners();
}
	
function init(){
	Tic_Tac_Toe = Array(size);
	grid = index_array(9);
	turn = true;
	for(var i=0;i<size;++i){
		Tic_Tac_Toe[i] = document.getElementById(i);
	}
}
	
function reset(){
	for(var i=0;i<size;++i){
		Tic_Tac_Toe[i].innerHTML = '';
	}
	grid = index_array(9);
	turn = true;
}

function addListeners(){
	for(var i=0;i<size;++i){
		Tic_Tac_Toe[i].setAttribute('onclick','handleTurn(event,this)');
		//Tic_Tac_Toe[i].setAttribute('onclick','handleTurn(event,'+i+')');
	}
}
	
function destroy(){
	for(var i=0;i<size;++i){
		Tic_Tac_Toe[i].setAttribute('onclick','handleTurn(event,this)');
	}
}
	
function handleTurn(e,DOM){
	var id =  DOM.id;
	if(turn && (typeof grid[id] != 'string') /*DOM.innerHTML==''*/){
		turn = false;
		
		mark(id,hooman);
			
		var end = check_win(grid,hooman);
		if(end == null){
			if(!check_tie(grid)){
				var spot = best_spot();
				mark(spot,'O');			
				end = check_win(grid,puter);
				if(end == null){

				}else{
					endgame(end.player,end.index);
					turn = false;
				}
			}else{
				endgame('-',null);
			}
			turn = true;
		}else{
			endgame(end.player,end.index);
			turn = false;
		}	
	}			
}

function mark(cell_id,player){
	//Tic_Tac_Toe[cell_id].innerHTML = (player=='O'?O:X);
	if(player=='X')
		document.getElementById('XO').innerHTML += create_x(cell_id);
	else
		document.getElementById('XO').innerHTML += create_o(cell_id);
	
	grid[cell_id] = player;
}

function best_spot(){
	return minmax_random(grid,puter,{protagonist : puter , rival : hooman},0.3).index;
}
		
function endgame(player,combo){
	if(player == puter){
		document.getElementById('result').innerHTML = 'You Lost!';	
	}else if(player == hooman){
		document.getElementById('result').innerHTML = 'You Won!';
	}else{
		document.getElementById('result').innerHTML = 'Its a Tie!';
	}	
		
	
	document.getElementById('result').className = 'active';
	document.getElementById('start_btn').className = 'active';
		
	if(combo!=null){
		for(var i=0;i<TicTacToe_winning_combinations[combo].length;++i){
		
		}
		document.getElementById('winning_move').style.display = 'block';
		document.getElementById('winning_move').innerHTML = create_svg(combo);		
	}	
}

function restart(){
	document.getElementById('result').className = 'not-active';
	document.getElementById('start_btn').className = 'not-active';
	document.getElementById('winning_move').style.display = 'none';
	document.getElementById('winning_move').innerHTML = '';
	document.getElementById('XO').innerHTML = '';
	reset();
}