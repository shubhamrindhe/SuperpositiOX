var stroke_width = 5;

var cells = document.getElementsByClassName('cell');

var X = '<svg width="80" height="80" class="">\
		<line x1="20" y1="20" x2="60" y2="60" style="stroke:blue;stroke-width:5" stroke-linecap="round"/>\
		<line x1="20" y1="60" x2="60" y2="20" style="stroke:blue;stroke-width:5" stroke-linecap="round"/>\
		</svg>';
var O = '<svg width="80" height="80" class="">\
		<circle cx="40" cy="40" r="25" stroke="red" fill="none" stroke-width="5" />\
		</svg>';

const hooman = 'X';
const puter = 'O';
var current_player = null;

var dim = 3;

var size = 9;
var Tic_Tac_Toe;
var grid;
var turn;
var winning_combos_cords = [
	{ x1: 0.05, y1: 1 / 6, x2: 0.95, y2: 1 / 6 },
	{ x1: 0.05, y1: 3 / 6, x2: 0.95, y2: 3 / 6 },
	{ x1: 0.05, y1: 5 / 6, x2: 0.95, y2: 5 / 6 },

	{ x1: 1 / 6, y1: 0.05, x2: 1 / 6, y2: 0.95 },
	{ x1: 3 / 6, y1: 0.05, x2: 3 / 6, y2: 0.95 },
	{ x1: 5 / 6, y1: 0.05, x2: 5 / 6, y2: 0.95 },

	{ x1: 0.05, y1: 0.05, x2: 0.95, y2: 0.95 },
	{ x1: 0.95, y1: 0.05, x2: 0.05, y2: 0.95 }
];
var grid_center_cords = [
	{ x: 1 / 6, y: 1 / 6 },
	{ x: 3 / 6, y: 1 / 6 },
	{ x: 5 / 6, y: 1 / 6 },

	{ x: 1 / 6, y: 3 / 6 },
	{ x: 3 / 6, y: 3 / 6 },
	{ x: 5 / 6, y: 3 / 6 },

	{ x: 1 / 6, y: 5 / 6 },
	{ x: 3 / 6, y: 5 / 6 },
	{ x: 5 / 6, y: 5 / 6 }
];

function index_array(n) {
	return Array.from(Array(n).keys());
}

function beginElements(list) {
	list.forEach(function (e, i, l) {
		e.beginElement();
	});
}
function beginElementsById(list) {
	list.forEach(function (e, i, l) {
		document.getElementById(e).beginElement();
	});
}

function create_line(x1, y1, x2, y2, color, lineWidth, animations) {
	animations_list = [];

	var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	line.setAttribute("x1", x1);
	line.setAttribute("y1", y1);
	line.setAttribute("x2", x2);
	line.setAttribute("y2", y2);
	line.setAttribute("stroke", color);
	line.setAttribute("stroke-width", lineWidth);
	line.setAttribute("stroke-linecap", "round");

	animations.forEach(function (e, i, l) {
		var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
		for (anim_attr in e) {
			animation.setAttribute(anim_attr, e[anim_attr]);
		}
		line.appendChild(animation);
		animations_list.push(animation);
	});

	return { line, animations_list };
}

function init_grid() {

	var rect = Tic_Tac_Toe.getBoundingClientRect();
	var W = rect.width;
	var w = W / dim;
	var l = 4;
	var color = 'black'
	var _ = 4;
	var anim_list = [];

	var line_h1_opt = create_line(W / 2, w, W / 2, w, color, l, [
		{
			attributeName: "x1",
			from: W / 2,
			to: 0 + _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "x2",
			from: W / 2,
			to: W - _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);
	document.getElementById('XO').appendChild(line_h1_opt.line);
	anim_list = anim_list.concat(line_h1_opt.animations_list);

	var line_h2_opt = create_line(W / 2, 2 * w, W / 2, 2 * w, color, l, [
		{
			attributeName: "x1",
			from: W / 2,
			to: 0 + _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "x2",
			from: W / 2,
			to: W - _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);
	document.getElementById('XO').appendChild(line_h2_opt.line);
	anim_list = anim_list.concat(line_h2_opt.animations_list);

	var line_v1_opt = create_line(w, W / 2, w, W / 2, color, l, [
		{
			attributeName: "y1",
			from: W / 2,
			to: 0 + _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "y2",
			from: W / 2,
			to: W - _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);
	document.getElementById('XO').appendChild(line_v1_opt.line);
	anim_list = anim_list.concat(line_v1_opt.animations_list);

	var line_v2_opt = create_line(2 * w, W / 2, 2 * w, W / 2, color, l, [
		{
			attributeName: "y1",
			from: W / 2,
			to: 0 + _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "y2",
			from: W / 2,
			to: W - _,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);
	document.getElementById('XO').appendChild(line_v2_opt.line);
	anim_list = anim_list.concat(line_v2_opt.animations_list);

	beginElements(anim_list);
}




function create_svg(i) {
	var win = winning_combos_cords[i];
	var w = document.getElementById('winning_move').getBoundingClientRect().width;

	var line = create_line(win.x1 * w, win.y1 * w, win.x1 * w, win.y1 * w, "rgba(0,0,0,1)", 10, [
		{
			attributeName: "x2",
			from: win.x1 * w,
			to: win.x2 * w,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "y2",
			from: win.y1 * w,
			to: win.y2 * w,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);

	return { line: line.line, animate_tags: line.animations_list };
}

function create_o(i) {
	var c = grid_center_cords[i];
	var w = document.getElementById('XO').getBoundingClientRect().width;

	var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
	let r = w / (1.5 * size);
	circle.setAttribute("cx", c.x * w);
	circle.setAttribute("cy", c.y * w);
	circle.setAttribute("r", r);
	circle.setAttribute("stroke", "blue");
	circle.setAttribute("fill", "rgba(255,255,255,0)");
	circle.setAttribute("stroke-width", stroke_width);
	circle.setAttribute("stroke-linecap", "round");

	/*
	var animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	animate.setAttribute("attributeName", "r");
	animate.setAttribute("from", 0);
	animate.setAttribute("to", w / (1.5 * size));
	animate.setAttribute("dur", "0.2s");
	animate.setAttribute("begin", "0s");
	animate.setAttribute("fill", "freeze");
	*/
	let l;
	try {
		l = circle.getTotalLength();
	} catch (err) {
		l = Math.ceil(2 * Math.PI * r);
	}
	circle.setAttribute("stroke-dasharray", l);

	var animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
	animate.setAttribute("attributeName", "stroke-dashoffset");
	animate.setAttribute("from", l);
	animate.setAttribute("to", 0);
	animate.setAttribute("dur", "0.3s");
	animate.setAttribute("begin", "0s");
	animate.setAttribute("fill", "freeze");

	circle.appendChild(animate)

	return { circle: circle, animate_tags: [animate] };
}

function create_x(i) {
	var c = grid_center_cords[i];
	var w = document.getElementById('XO').getBoundingClientRect().width;
	var s = w / (2 * size);
	var anim_list = [];

	var line1 = create_line(c.x * w - s, c.y * w - s, c.x * w - s, c.y * w - s, "red", stroke_width, [
		{
			attributeName: "x2",
			from: c.x * w - s,
			to: c.x * w + s,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "y2",
			from: c.y * w - s,
			to: c.y * w + s,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);


	anim_list = anim_list.concat(line1.animations_list);

	var line2 = create_line(c.x * w - s, c.y * w + s, c.x * w - s, c.y * w + s, "red", stroke_width, [
		{
			attributeName: "x2",
			from: c.x * w - s,
			to: c.x * w + s,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}, {
			attributeName: "y2",
			from: c.y * w + s,
			to: c.y * w - s,
			dur: "0.3s",
			begin: "0s",
			fill: "freeze"
		}
	]);

	anim_list = anim_list.concat(line2.animations_list);

	return { line1: line1.line, line2: line2.line, animate_tags: anim_list };

}






function init() {
	Tic_Tac_Toe = document.getElementById('XO')
	grid = index_array(9);
	turn = true;
	current_player = hooman;

	init_grid();
}



function reset() {
	Tic_Tac_Toe.innerHTML = '';
	grid = index_array(9);
	turn = true;
	current_player = hooman;

	init_grid();
}

function addListeners() {
	Tic_Tac_Toe.setAttribute('onclick', 'handle_svg(event,this)');

	for (var i = 0; i < cells.length; ++i) {
		cells[i].setAttribute('onclick', 'handle_table(event,this)');
		//Tic_Tac_Toe[i].setAttribute('onclick','handleTurn(event,'+i+')');
	}

}

function handle_svg(e, DOM) {
	if (document.querySelector("#controls").style.display != 'none') {
		document.querySelector("#controls").style.display = 'none';
	}

	var rect = DOM.getBoundingClientRect();
	var i = Math.floor((e.x - rect.left) / (rect.width / dim));
	var j = Math.floor((e.y - rect.top) / (rect.height / dim));
	var id = i + dim * j;

	if (typeof grid[id] == 'string') {
		return;
	}

	handle(id);
}

function handle_table(e, DOM) {
	var id = DOM.id;
	handle(id);
}

function handle(id) {
	if (turn && document.querySelector("input[name=player-2]:checked").id == 'computer') {
		turn = false;
		mark(id, hooman);

		var end = check_win(grid, hooman);
		if (end == null) {
			if (!check_tie(grid)) {

				document.getElementById('loader').style.display = 'block';

				/*
				var spot = best_spot();
				mark(spot,'O');
				document.getElementById('loader').style.display = 'none';

				end = check_win(grid,puter);
				if(end == null){
				}else{
					endgame(end.player,end.index);
					turn = false;
				}
				*/


				best_spot().then(spot => {
					setTimeout(() => {
						mark(spot, 'O');
						document.getElementById('loader').style.display = 'none';

						end = check_win(grid, puter);
						if (end == null) {

						} else {
							endgame(end.player, end.index);
							turn = false;
						}
						turn = true;
					}, 5)
				});
			} else {
				endgame(null, null);
			}
		} else {
			endgame(end.player, end.index);
			turn = false;
		}
	} else if (turn) {
		turn = false;
		mark(id, current_player);
		var end = check_win(grid, current_player);
		if (end == null) {
			if (!check_tie(grid)) {
			} else {
				endgame(null, null);
			}
			turn = true;
		} else {
			endgame(end.player, end.index);
			turn = false;
		}
		current_player = current_player == hooman ? puter : hooman;
	}
}

function mark(cell_id, player) {
	//Tic_Tac_Toe[cell_id].innerHTML = (player=='O'?O:X);
	if (player == 'X') {
		//document.getElementById('XO').innerHTML += create_x(cell_id);
		var x = create_x(cell_id);
		document.getElementById('XO').appendChild(x.line1);
		document.getElementById('XO').appendChild(x.line2);
		beginElements(x.animate_tags);
	} else {
		//document.getElementById('XO').innerHTML += create_o(cell_id);
		var o = create_o(cell_id);
		document.getElementById('XO').appendChild(o.circle);
		beginElements(o.animate_tags);
	}
	grid[cell_id] = player;
}

function best_spot() {

	return new Promise(resolve => {
		resolve(minmax_random(grid, puter, { protagonist: puter, rival: hooman }, 0.3).index);
	});

	//return minmax_random(grid,puter,{protagonist : puter , rival : hooman},0.3).index;
}

function endgame(player, combo) {
	if (document.querySelector("input[name=player-2]:checked").id == 'computer') {
		if (player == puter) {
			document.getElementById('result').innerHTML = 'You Lost!';
		} else if (player == hooman) {
			document.getElementById('result').innerHTML = 'You Won!';
		} else {
			document.getElementById('result').innerHTML = 'Its a Tie!';
		}
	} else {
		if (player) {
			document.getElementById('result').innerHTML = player+' Won!';
		} else {
			document.getElementById('result').innerHTML = 'Its a Tie!';
		}
	}


	document.getElementById('result').className = 'active';
	document.getElementById('start_btn').className = 'active';

	if (combo != null) {
		for (var i = 0; i < TicTacToe_winning_combinations[combo].length; ++i) {

		}
		document.getElementById('winning_move').style.display = 'block';
		//document.getElementById('winning_move').innerHTML = create_svg(combo);

		var l = create_svg(combo)
		document.getElementById('winning_move').appendChild(l.line);
		//l.animate_tags[0].beginElement();
		beginElements(l.animate_tags);
	}
}

function restart() {
	document.getElementById('result').className = 'not-active';
	document.getElementById('start_btn').className = 'not-active';
	document.getElementById('winning_move').style.display = 'none';
	document.getElementById('winning_move').innerHTML = '';
	document.getElementById('XO').innerHTML = '';
	document.querySelector("#controls").style.display = 'flex';
	reset();
}

window.onload = function () {
	init();
	addListeners();
}
