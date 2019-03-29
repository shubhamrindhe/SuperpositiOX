from math import inf as Infinity

winning_combos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],

	[0,3,6],
	[1,4,7],
	[2,5,8],
	
	[0,4,8],
	[2,4,6]
]

class TicTacToe :
	def __init__(self):
		self.board = list(range(9))
	
	def new_board(self):
		self.board = list(range(9))

	def empty_cells(self):
		return [ cell for cell in self.board if type(cell) is int ]
	
	def get_cells(self,player):
		return [ i for i,cell in enumerate(self.board) if cell == player ]
		
	def checkTie(self):
		if len(self.empty_cells()) == 0	:
			return True
		else:
			return False
	
	def check_win(self,player):
		player_cells = self.get_cells(player)
		gamewin = None
		for combination in winning_combos :
			intersection = [ value for value in combination if value in player_cells ]
			if intersection in winning_combos :
				gamewin = [
					winning_combos.index(intersection),
					player
				]
				break
		return gamewin
	
	def mark(self,cell,marker):
		if type(self.board[cell]) is int :
			self.board[cell] = marker
		else:
			print('cell already taken!')


		
t = TicTacToe()
print(t)		
print(t.board)

t.mark(0,'X')
t.mark(1,'X')
t.mark(2,'X')
		
print(t.board)		
print(t.empty_cells())		
print(t.checkTie())		
print(t.check_win('X'))		