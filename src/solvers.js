/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var rookCount = 0;
  var solution = [];

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.get(row)[col] = 1;
      if (board.hasAnyRooksConflicts() === true) {
        board.get(row)[col] = 0;
      } else {
        rookCount++;
        if (rookCount === n) {
          for (var k = 0; k < n; k++) {
            solution.push(board.get(k));
          }
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var queenCount = 0;
  var solution = [];
  
  var attempt = [];
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      attempt.push([i, j]);
    }
  }

  for (var attemptNum = 0; attemptNum < attempt.length; attemptNum++) {
    board = new Board({n: n});
    queenCount = 1;
    solution = [];
    board.get(attempt[attemptNum][0])[attempt[attemptNum][1]] = 1;
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if (row === attempt[attemptNum][0] && col === attempt[attemptNum][1] && n !== 1) {
          continue;
        }
        board.get(row)[col] = 1;
        if (board.hasAnyQueensConflicts() === true) {
          board.get(row)[col] = 0;
        } else if (n !== 1) {
            queenCount++;
          }
        if (queenCount === n) {
          for (var k = 0; k < n; k++) {
            solution.push(board.get(k));
          }
          console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
          return solution;
        }
      }
    }
  }
  return (n === 0) ? [] : {n: n};
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
