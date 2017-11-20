function updateBoard() {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if (board[j][i] > 0) {
				if (board[j][i] == 2) {
					$('.board div:nth-child(' + (j * 4 + i + 1) + ')').addClass('two');
				}
				if (board[j][i] == 4) {
					$('.board div:nth-child(' + (j * 4 + i + 1) + ')').addClass('four');
				}
				if (board[j][i] == 8) {
					$('.board div:nth-child(' + (j * 4 + i + 1) + ')').addClass('eight');
				}
				if (board[j][i] == 16) {
					$('.board div:nth-child(' + (j * 4 + i + 1) + ')').addClass('sixteen');
				}
				if (board[j][i] == 32) {
					$('.board div:nth-child(' + (j * 4 + i + 1) + ')').addClass('thirty-two');
				}
				if (board[j][i] == 64) {
					$('.board div:nth-child(' + (j * 4 + i + 1) + ')').addClass('sixty-four');
				}
			}
		}
	}
}

function shiftLeft() {
	// remove current classes

	updateBoard();
}

$(document).keypress(function(e) {
	switch (e.which) {
		case 37: // left
			break;
		case 38: // up
			break;
		case 39: // right
			break;
		case 40: // down
			break;
	}
	e.preventDefault();
});

board = [[2, 2, 2, 2], [4, 4, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];