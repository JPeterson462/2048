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
	$scope.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	$scope.score = 0;

	// TODO:
	// Game Over overlay
	// Button to restart
	// moveLeft, moveRight, moveUp, moveDown
	// keyboard input handler

	$scope.findEmptySquare = function () {
		var empty = [];
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < $scope.board[i].length; j++) {
				if ($scope.board[i][j] == 0) {
					empty.push({
						row: i,
						col: j
					});
				}
			}
		}
		return empty[Math.floor(Math.random() * empty.length)];
	};

	$scope.getScore = function () {
		var score = 0;
		for (var i = 0; i < $scope.board.length; i++) {
			for (var j = 0; j < $scope.board[i].length; j++) {
				score += $scope.board[i][j];
			}
		}
		$scope.score = score;
	};

	$scope.addNewTile = function () {
		var space = $scope.findEmptySquare();
		$scope.board[space.row][space.col] = 2;
	}

	$scope.init = function () {
		$scope.addNewTile();
		$scope.addNewTile();
		$scope.getScore();
	};
});