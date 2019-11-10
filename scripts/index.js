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

	var line = document.createElementNS('http://www.w3.org/2000/svg','line');
	line.setAttribute("x1",win.x1*w);
	line.setAttribute("y1",win.y1*w);
	line.setAttribute("x2",win.x1*w);
	line.setAttribute("y2",win.y1*w);
	line.setAttribute("stroke","rgba(0,0,0,1)");
	line.setAttribute("stroke-width",20);
	line.setAttribute("stroke-linecap","round");
	
	var animate1 = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate1.setAttribute("attributeName","x2");
	animate1.setAttribute("from",win.x1*w);
	animate1.setAttribute("to",win.x2*w);
	animate1.setAttribute("dur","0.3s");
	animate1.setAttribute("begin","0s");
	animate1.setAttribute("fill","freeze");
	
	var animate2 = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate2.setAttribute("attributeName","y2");
	animate2.setAttribute("from",win.y1*w);
	animate2.setAttribute("to",win.y2*w);
	animate2.setAttribute("dur","0.3s");
	animate2.setAttribute("begin","0s");
	animate2.setAttribute("fill","freeze");
	
	line.appendChild(animate1)
	line.appendChild(animate2)
	
	return {line:line,animate_tags:[animate1,animate2]};
	
	/*
	return '<line x1="'+(win.x1*w)+'" y1="'+(win.y1*w)+'" x2="'+(win.x2*w)+'" y2="'+(win.y2*w)+'" style="stroke:rgba(0,0,0,0.8);stroke-width:20" stroke-linecap="round">\
		<animate \
			xlink:href="#line-0-1"\
			attributeName="x2" \
			from="20"\
			to="60" \
			dur="0.1s"\
			begin="0s"\
			fill="freeze"\ 
			id="line-0-1"/>\
		<animate \
			xlink:href="#line-0-1"\
			attributeName="y2" \
			from="20"\
			to="60" \
			dur="0.1s"\
			begin="0s"\
			fill="freeze"\ 
			id="line-0-1"/>\
	</line>';
	*/
}

function create_o(i){
	var c = grid_center_cords[i];
	var w = document.getElementById('XO').getBoundingClientRect().width;
	
	var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
	circle.setAttribute("cx",c.x*w);
	circle.setAttribute("cy",c.y*w);
	circle.setAttribute("r",w/(1.5*size));
	circle.setAttribute("stroke","red");
	circle.setAttribute("fill","rgba(255,255,255,0)");
	circle.setAttribute("stroke-width",stroke_width);
	
	var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate.setAttribute("attributeName","r");
	animate.setAttribute("from",0);
	animate.setAttribute("to",w/(1.5*size));
	animate.setAttribute("dur","0.2s");
	animate.setAttribute("begin","0s");
	animate.setAttribute("fill","freeze");
	
	circle.appendChild(animate)
	
	return {circle:circle,animate_tags:[animate]};
	/*
	return '<circle cx="'+c.x*w+'" cy="'+c.y*w+'" r="'+w/(1.5*size)+'" stroke="red" fill="rgba(255,255,255,0)" stroke-width="'+stroke_width+'" >\
			<animate \
				attributeName="r" \
				from="0" \
				to="25" \
				dur="0.1s" \
				begin="0s" \
				fill="freeze"></animate>\
	</circle>';
	*/
}
function create_x(i){
	var c = grid_center_cords[i];
	var w = document.getElementById('XO').getBoundingClientRect().width;
	var s = w/(2*size);
	
	var line1 = document.createElementNS('http://www.w3.org/2000/svg','line');
	line1.setAttribute("x1",c.x*w-s);
	line1.setAttribute("y1",c.y*w-s);
	line1.setAttribute("x2",c.x*w-s);
	line1.setAttribute("y2",c.y*w-s);
	line1.setAttribute("stroke","blue");
	line1.setAttribute("stroke-width",stroke_width);
	line1.setAttribute("stroke-linecap","round");
	
	var animate1 = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate1.setAttribute("attributeName","x2");
	animate1.setAttribute("from",c.x*w-s);
	animate1.setAttribute("to",c.x*w+s);
	animate1.setAttribute("dur","0.3s");
	animate1.setAttribute("begin","0s");
	animate1.setAttribute("fill","freeze");
	
	var animate2 = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate2.setAttribute("attributeName","y2");
	animate2.setAttribute("from",c.y*w-s);
	animate2.setAttribute("to",c.y*w+s);
	animate2.setAttribute("dur","0.3s");
	animate2.setAttribute("begin","0s");
	animate2.setAttribute("fill","freeze");
	
	line1.appendChild(animate1)
	line1.appendChild(animate2)
	
	
	var line2 = document.createElementNS('http://www.w3.org/2000/svg','line');
	line2.setAttribute("x1",c.x*w-s);
	line2.setAttribute("y1",c.y*w+s);
	line2.setAttribute("x2",c.x*w-s);
	line2.setAttribute("y2",c.y*w+s);
	line2.setAttribute("stroke","blue");
	line2.setAttribute("stroke-width",stroke_width);
	line2.setAttribute("stroke-linecap","round");
	
	var animate3 = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate3.setAttribute("attributeName","x2");
	animate3.setAttribute("from",c.x*w-s);
	animate3.setAttribute("to",c.x*w+s);
	animate3.setAttribute("dur","0.3s");
	animate3.setAttribute("begin","0s");
	animate3.setAttribute("fill","freeze");
	
	var animate4 = document.createElementNS('http://www.w3.org/2000/svg','animate');
	animate4.setAttribute("attributeName","y2");
	animate4.setAttribute("from",c.y*w+s);
	animate4.setAttribute("to",c.y*w-s);
	animate4.setAttribute("dur","0.3s");
	animate4.setAttribute("begin","0s");
	animate4.setAttribute("fill","freeze");
	
	line2.appendChild(animate3)
	line2.appendChild(animate4)
	
	return {line1:line1,line2:line2,animate_tags:[animate1,animate2,animate3,animate4]};
	/*
	return '\
		<line x1="'+(c.x*w-s)+'" y1="'+(c.y*w-s)+'" x2="'+(c.x*w+s)+'" y2="'+(c.y*w+s)+'" style="stroke:blue;stroke-width:'+stroke_width+'" stroke-linecap="round">\
		</line>\
		<line x1="'+(c.x*w-s)+'" y1="'+(c.y*w+s)+'" x2="'+(c.x*w+s)+'" y2="'+(c.y*w-s)+'" style="stroke:blue;stroke-width:'+stroke_width+'" stroke-linecap="round">\
		</line>\
	';
	*/
	
}	
	
function beginElements(list){
	list.forEach(function(e,i,l){
		e.beginElement();
	});
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
	if(player=='X'){
		//document.getElementById('XO').innerHTML += create_x(cell_id);
		var x = create_x(cell_id);
		document.getElementById('XO').appendChild( x.line1 );
		document.getElementById('XO').appendChild( x.line2 );
		beginElements(x.animate_tags);
	}else{
		//document.getElementById('XO').innerHTML += create_o(cell_id);
		var o = create_o(cell_id);
		document.getElementById('XO').appendChild( o.circle );
		beginElements(o.animate_tags);
	}
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
		//document.getElementById('winning_move').innerHTML = create_svg(combo);	
		
		var l = create_svg(combo)
		document.getElementById('winning_move').appendChild( l.line );
		//l.animate_tags[0].beginElement();
		beginElements(l.animate_tags);
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