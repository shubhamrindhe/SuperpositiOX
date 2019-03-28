
hooman = 'X'
puter  = 'O'

Infinity = float("inf")

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



def new_grid():
	return list(range(9))

grid = new_grid()

def print_grid(grid):
	print(grid[0],end="|"),print(grid[1],end="|"),print(grid[2])
	print(grid[3],end="|"),print(grid[4],end="|"),print(grid[5])
	print(grid[6],end="|"),print(grid[7],end="|"),print(grid[8])
	
def empty_cells(_grid):
	return [ cell for cell in _grid if type(cell) is int ]

def get_cells(_grid,player):
	return [ i for i,cell in enumerate(_grid) if cell == player ]

def check_win(_grid,player):
	player_cells = get_cells(_grid,player)
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
	
	
	
	

def checkTie(_grid):
	if len(empty_cells(_grid)) == 0	:
		return True
	else:
		return False


def minimax(board,player,mark):	
	if check_win(board,'X') != None :
		return -1
	if check_win(board,'O') != None :
		return  1
	if checkTie(board) :
		return  0	

	#bestscore = -Infinity if player else Infinity
	bestscore = None
	if player :
		bestscore = -Infinity
	else:
		bestscore = Infinity
		
	alpha_move = None
		
	if player :
		#for index,cell in enumerate(empty_cells(board)) :
		for cell in empty_cells(board) :
			move =[None,None]
			move[0] = cell
			board[cell] = mark[0]
			result = minimax(board,False,mark)
			move[1] = result
			if(move[1] > bestscore):
				bestscore = move[1]
				alpha_move = move[0]
			board[cell] = move[0]
	else :
		#for index,cell in enumerate(empty_cells(board)) :
		for cell in empty_cells(board) :
			move = [None,None]
			move[0] = cell
			board[cell] = mark[1]
			result = minimax(board,True,mark)
			move[1] = result
			if(move[1] < bestscore):
				bestscore = move[1]
				alpha_move = move[0]
			board[cell] = move[0]
	
	return alpha_move
		

def mark_cell(_grid,cell,mark):
	_grid[cell] = mark


#mark_cell(grid,0,'X')

#print(check_win(grid,'X'))
#print(get_cells(grid,'X'))
#print(checkTie(grid))
#print(minimax(grid,True,['O','X']))
#print(empty_cells(grid))
#print_grid(grid)



def infinity_loop():
	while(True):
		print_grid(grid);
		if checkTie(grid) :
			print("Tie!")
			break
		if check_win(grid,'X')!=None:
			print("You Won!")
			break
		if check_win(grid,'O')!=None:
			print("computer Won!")
			break	
		'''
		if  id in range(9) :
			break
		'''
		id = int(input("Enter cell id : "))
		mark_cell(grid,id,'X')
		
		
		if checkTie(grid) :
			print("Tie!")
			break
		if check_win(grid,'X')!=None:
			print("You Won!")
			break
		if check_win(grid,'O')!=None:
			print("computer Won!")
			break
		
		
		id = minimax(grid,True,['O','X'])
		print(id)
		mark_cell(grid,id,'O')
		
	print_grid(grid)	
		
	
	
infinity_loop()	






