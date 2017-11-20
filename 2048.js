function updateBoard() {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if (board[j][i] >= 0) {
				if (board[j][i] == 0) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space');
				}
				if (board[j][i] == 2) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space two');
				}
				if (board[j][i] == 4) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space four');
				}
				if (board[j][i] == 8) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space eight');
				}
				if (board[j][i] == 16) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space sixteen');
				}
				if (board[j][i] == 32) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space thirty-two');
				}
				if (board[j][i] == 64) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space sixty-four');
				}
				if (board[j][i] == 128) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space one-twenty-eight');
				}
				if (board[j][i] == 256) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space two-fifty-six');
				}
				if (board[j][i] == 512) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space five-twelve');
				}
				if (board[j][i] == 1024) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space ten-twenty-four');
				}
				if (board[j][i] == 2048) {
					$('.board .row:nth-child(' + (j + 1) + ') div:nth-child(' + (i + 1) + ')').attr('class', 'space twenty-forty-eight');
					$('.alert').text('You Win!');
					gameActive = false;
				}
			}
		}
	}
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnTwo() {
	rows = []
	cols = []
	for (j = 0; j < 4; j++) {
		for (i = 0; i < 4; i++) {
			if (board[j][i] == 0) {
				rows.push(j);
				cols.push(i);
			}
		}
	}
	if (cols.length == 0) {
		$('.alert').text('Game Over!');
		gameActive = false;
	} else {
		index = randomInt(1, cols.length) - 1;
		board[rows[index]][cols[index]] = 2;
		updateBoard();
	}
}

function shiftLeft() {
	for (j = 0; j < 4; j++) {
		shiftRowLeft(board[j])
	}
	spawnTwo();
	updateBoard();
	$('.score #value').text('' + score);
}

function shiftRowLeft(row) {
	while (row[0] == 0 && (row[1] > 0 || row[2] > 0 || row[3] > 0)) {
		row[0] = row[1];
		row[1] = row[2];
		row[2] = row[3];
		row[3] = 0;
	}
	while (row[1] == 0 && (row[2] > 0 || row[3] > 0)) {
		row[1] = row[2];
		row[2] = row[3];
		row[3] = 0;
	}
	while (row[2] == 0 && row[3] > 0) {
		row[2] = row[3];
		row[3] = 0;
	}
	if (row[2] == row[3]) {
		score += row[2] * 2;
		row[2] = row[2] + row[3];
		row[3] = 0;
	}
	if (row[1] == row[2]) {
		score += row[1] * 2;
		row[1] = row[1] + row[2];
		row[2] = row[3];
		row[3] = 0;
	}
	if (row[0] == row[1]) {
		score += row[0] * 2;
		row[0] = row[0] + row[1];
		row[1] = row[2];
		row[2] = row[3];
		row[3] = 0;
	}
}

function shiftUp() {
	for (i = 0; i < 4; i++) {
		col = [ board[0][i], board[1][i], board[2][i], board[3][i] ];
		shiftRowLeft(col);
		board[0][i] = col[0];
		board[1][i] = col[1];
		board[2][i] = col[2];
		board[3][i] = col[3];
	}
	spawnTwo();
	updateBoard();
	$('.score #value').text('' + score);
}

function shiftRight() {
	for (j = 0; j < 4; j++) {
		row = [ board[j][3], board[j][2], board[j][1], board[j][0] ];
		shiftRowLeft(row);
		board[j][3] = row[0];
		board[j][2] = row[1];
		board[j][1] = row[2];
		board[j][0] = row[3];
	}
	spawnTwo();
	updateBoard();
	$('.score #value').text('' + score);
}

function shiftDown() {
	for (i = 0; i < 4; i++) {
		col = [ board[3][i], board[2][i], board[1][i], board[0][i] ];
		shiftRowLeft(col);
		board[3][i] = col[0];
		board[2][i] = col[1];
		board[1][i] = col[2];
		board[0][i] = col[3];
	}
	spawnTwo();
	updateBoard();
	$('.score #value').text('' + score);
}

board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
score = 0;
gameActive = true;