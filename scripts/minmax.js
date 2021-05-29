var Heuristic_Array = [
	[0, -10, -100, -1000],
	[10, 0, 0, 0],
	[100, 0, 0, 0],
	[1000, 0, 0, 0]
];

function evaluatePosition(board, player) {
	var opponent = (player == 'X') ? 'O' : 'X', piece;
	var players, others, t = 0, i, j;
	for (i = 0; i < 8; i++) {
		players = others = 0;
		for (j = 0; j < 3; j++) {
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
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	[0, 4, 8],
	[2, 4, 6]
];

function empty_cells(list) {
	return list.filter(s => typeof s == 'number');
}

function check_tie(_) {
	if ((empty_cells(_).length) == 0)
		return true;
	else
		return false;
}

function check_win(_, player) {
	let plays = _.reduce((a, e, i) => ((e === player) ? a.concat(i) : a), []);
	let gamewin = null;

	for (let [index, combo] of TicTacToe_winning_combinations.entries()) {
		if (combo.every(elem => plays.indexOf(elem) > -1)) {
			gamewin = {
				index: index,
				player: player
			};
			break;
		}
	}
	return gamewin;
}

function minmax(state, player, mark) {
	var _ = state;//state.slice();

	if (check_win(_, mark.protagonist))
		return { score: 1 };
	if (check_win(_, mark.rival))
		return { score: -1 };
	if (check_tie(_))
		return { score: 0 };

	var bestscore = (player == mark.protagonist ? -Infinity : Infinity);
	var alpha_move;
	empty_cells(_).forEach(function (cell, index, list) {
		var move = {};
		move.index = _[cell];
		_[cell] = player == mark.protagonist ? mark.protagonist : mark.rival;
		if (player == mark.protagonist) {
			var result = minmax(_, mark.rival, mark);
			move.score = result.score;
			if (move.score > bestscore) {
				bestscore = move.score;
				alpha_move = move;
			}
		} else {
			var result = minmax(_, mark.protagonist, mark);
			move.score = result.score;
			if (move.score < bestscore) {
				bestscore = move.score;
				alpha_move = move;
			}
		}
		_[cell] = move.index;
	});
	return alpha_move;
}

function minmax_random(state, player, mark, prob = 0.5) {
	var _ = state;//state.slice();

	if (check_win(_, mark.protagonist))
		return { score: 1 };
	if (check_win(_, mark.rival))
		return { score: -1 };
	if (check_tie(_))
		return { score: 0 };

	var bestscore = (player == mark.protagonist ? -Infinity : Infinity);
	var alpha_move;
	empty_cells(_).forEach(function (cell, index, list) {
		var move = {};
		move.index = _[cell];
		_[cell] = player == mark.protagonist ? mark.protagonist : mark.rival;
		if (player == mark.protagonist) {
			var result = minmax_random(_, mark.rival, mark, prob);
			move.score = result.score;
			if (move.score == bestscore && Math.random() < prob) {
				bestscore = move.score;
				alpha_move = move;
			}
			if (move.score > bestscore) {
				bestscore = move.score;
				alpha_move = move;
			}
		} else {
			var result = minmax_random(_, mark.protagonist, mark, prob);
			move.score = result.score;
			if (move.score < bestscore) {
				bestscore = move.score;
				alpha_move = move;
			}
		}
		_[cell] = move.index;
	});
	return alpha_move;
}
