var app = angular.module('2048', []);

app.directive('backgroundImg', function () {
	return function ($scope, element, attrs) {
		var url = attrs.backgroundImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
	};
});

app.controller('BoardController', function ($scope) {
	$scope.createBoard = function (width, height) {
		var board = [];
		for (var j = 0; j < height; j++) {
			var row = [];
			for (var i = 0; i < width; i++) {
				row.push({value: 0});
			}
			board.push(row);
		}
		return board;
	};

	$scope.score = 0;
	$scope.game = {};

	$scope.shuffle = function (a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;
	};

	$scope.findEmptySquare = function () {
		var empty = [];
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < $scope.board[i].length; j++) {
				if ($scope.board[i][j].value == 0) {
					empty.push({
						row: i,
						col: j
					});
				}
			}
		}
		$scope.shuffle(empty);
		if (empty.length == 0) {
			return null;
		}
		return empty[Math.floor(Math.random() * empty.length)];
	};

	$scope.getScore = function () {
		var score = 0;
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < $scope.board[i].length; j++) {
				score += $scope.board[i][j].value;
			}
		}
		$scope.score = score;
	};

	$scope.game.shiftRowsLeft = function (tmp, transformRow) {
		for (var j = 0; j < tmp.length; j++) {
			var row = tmp[j];
			for (var k = 0; k < row.length - 1; k++) {
				while (row[k].value == 0) {
					var allZero = true;
					for (var n = k + 1; n < row.length; n++) {
						allZero = allZero && row[n].value <= 0;
					}
					if (allZero) {
						break;
					}
					for (var n = k; n < row.length - 1; n++) {
						row[n].value = row[n + 1].value;
					}
					row[row.length - 1].value = 0;
				}
			}
			for (var k = 0; k <= row.length - 2; k++) {
				if (row[k].value == row[k + 1].value) {
					row[k].value = row[k].value + row[k + 1].value;
					for (var n = k + 1; n <= row.length - 2; n++) {
						row[n].value = row[n + 1].value;
					}
					row[row.length - 1].value = 0;
				}
			}
			transformRow(row);
			$scope.board.push(row);
		}
	};

	$scope.game.shiftLeft = function () {
		var tmp = [];
		for (var j = 0; j < $scope.board.length; j++) {
			var row = [];
			for (var i = 0; i < $scope.board[j].length; i++) {
				row.push({value: $scope.board[j][i].value});
			}
			tmp.push(row);
		}
		$scope.board = [];
		$scope.game.shiftRowsLeft(tmp, function (row) {  });
	};
	
	$scope.game.shiftRight = function () {
		var tmp = [];
		for (var j = 0; j < $scope.board.length; j++) {
			var row = [];
			for (var i = 0; i < $scope.board[j].length; i++) {
				row.push({value: $scope.board[j][$scope.board[j].length - i - 1].value});
			}
			tmp.push(row);
		}
		$scope.board = [];
		$scope.game.shiftRowsLeft(tmp, function (row) { 
			for (var i = 0; i < row.length / 2; i++) {
				var tmp = row[i].value;
				row[i].value = row[row.length - 1 - i].value;
				row[row.length - 1 - i].value = tmp;
			}
		});
	};

	$scope.game.shiftUp = function () {
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < i; j++) {
				var tmp = $scope.board[i][j];
				$scope.board[i][j] = $scope.board[j][i];
				$scope.board[j][i] = tmp;
			}
		}
		$scope.game.shiftLeft();
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < i; j++) {
				var tmp = $scope.board[i][j];
				$scope.board[i][j] = $scope.board[j][i];
				$scope.board[j][i] = tmp;
			}
		}
	};
	
	$scope.game.shiftDown = function () {
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < i; j++) {
				var tmp = $scope.board[i][j];
				$scope.board[i][j] = $scope.board[j][i];
				$scope.board[j][i] = tmp;
			}
		}
		$scope.game.shiftRight();
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < i; j++) {
				var tmp = $scope.board[i][j];
				$scope.board[i][j] = $scope.board[j][i];
				$scope.board[j][i] = tmp;
			}
		}
	};

	$scope.handleKey = function (event) {
		switch (event.keyCode) {
			case 37: // left
				$scope.game.shiftLeft();
				break;
			case 38: // up
				$scope.game.shiftUp();
				break;
			case 39: // right
				$scope.game.shiftRight();
				break;
			case 40: // down
				$scope.game.shiftDown();
				break;
		}
		$scope.addNewTile();
		$scope.getScore();
		var max = 0;
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < $scope.board[i].length; j++) {
				max = Math.max(max, $scope.board[i][j].value);
			}
		}
		if (max == 2048) {
			$scope.result = "You Win!"
			$("#endGameModal").modal('show');			
		}
	};



	$scope.addNewTile = function () {
		var space = $scope.findEmptySquare();
		if ($scope.findEmptySquare() == null) {
			$scope.result = "Game Over!"
			$("#endGameModal").modal('show');
		} else {
			$scope.board[space.row][space.col].value = 2;
		}
	};

	$scope.init = function () {
		$scope.board = $scope.createBoard(4, 4);
		$scope.addNewTile();
		$scope.addNewTile();
		$scope.getScore();
	};
});