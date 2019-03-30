from math import inf as Infinity

class TicTacToe :
	@staticmethod
	def winning_combinations():
		return [
			[0,1,2],
			[3,4,5],
			[6,7,8],

			[0,3,6],
			[1,4,7],
			[2,5,8],
			
			[0,4,8],
			[2,4,6]
		]
	

	def __init__(self):
		self.board = list(range(9))
	
	def new_board(self):
		self.board = list(range(9))

	def empty_cells(self):
		return [ cell for cell in self.board if type(cell) is int ]
	
	def get_cells(self,player):
		return [ i for i,cell in enumerate(self.board) if cell == player ]
		
	def check_tie(self):
		if len(self.empty_cells()) == 0	:
			return True
		else:
			return False
	
	def check_win(self,player):
		player_cells = self.get_cells(player)
		gamewin = None
		combinations = TicTacToe.winning_combinations()
		for index,combination in enumerate(combinations) :
			intersection = [ value for value in combination if value in player_cells ]
			if intersection in combinations :
				gamewin = [
					player,
					index
					#combinations.index(intersection)
				]
				break
		return gamewin
	
	def mark(self,cell,marker):
		if type(self.board[cell]) is int :
			self.board[cell] = marker
			return True
		else:
			return False
			
	def get_char(self,cell):
		if type(self.board[cell]) is int :
			return ' '
		else:
			return self.board[cell]
		
			
	def render(self):
		print( " %s | %s | %s  "% ( self.get_char(0) , self.get_char(1) , self.get_char(2) ) )
		#print( "----+----+-----")
		print( " %s | %s | %s  "% ( self.get_char(3) , self.get_char(4) , self.get_char(5) ) )
		#print( "----+----+-----")
		print( " %s | %s | %s  "% ( self.get_char(6) , self.get_char(7) , self.get_char(8) ) )
		
	def minimax(self,player,mark):
		if self.check_win(mark[1]) != None :
			return {'score':-1,'index':-1}
		if self.check_win(mark[0]) != None :
			return {'score': 1,'index':-1}
		if self.check_tie() :
			return {'score': 0,'index':-1}	
		bestscore = -Infinity if player else Infinity
		alpha_move = {'score':None,'index':None}
			
		if player :
			for cell in self.empty_cells() :
				move = {'score':None,'index':None}
				move['index'] = cell
				self.board[cell] = mark[0]
				result = self.minimax(False,mark)
				move['score'] = result['score']
				self.board[cell] = cell
				if(move['score'] > bestscore):
					bestscore = move['score']
					alpha_move = move
		else :
			for cell in self.empty_cells() :
				move = {'score':None,'index':None}
				move['index'] = cell
				self.board[cell] = mark[1]
				result = self.minimax(True,mark)
				move['score'] = result['score']
				self.board[cell] = cell
				if(move['score'] < bestscore):
					bestscore = move['score']
					alpha_move = move
		
		return alpha_move
		
	def doctor_strange(self,player,mark):
		return self.minimax(player,mark)['index']
		


		
t = TicTacToe()
print(t)		
print(t.board)

t.mark(0,'X')
'''
t.mark(1,'X')
t.mark(2,'X')
'''	
print(t.board)		
print(t.empty_cells())		
print(t.check_tie())		
print(t.check_win('X'))
print(t.minimax(True,['O','X']))		
print(t.doctor_strange(True,['O','X']))		
print(TicTacToe.winning_combinations())		
t.render()