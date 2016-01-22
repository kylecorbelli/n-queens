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

  return (function factorial(num) {
    if (num < 1) {
      return 1;
    } else {
      return num * factorial(num - 1);
    }
  })(n);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

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
  var solutionCount;
  var solutions = [];
  var stringifiedSolutions =[];
  var queenCount = 0;

  var board = new Board({n: n});

  if (n === 0 || n === 1) {
    return 1;
  }


  function recurse(row, col) {
    for (col = col; col < n; col++) {
      board.get(row)[col] = 1;
      if (!board.hasAnyQueensConflicts()) {
        if (row + 1 === n) {
          // if (n === 8) {
          // debugger;
            
          // }
          queenCount++;
          board.get(row)[col] = 0;
          return;
        } else {
          recurse(row + 1, 0);
        }
      }

      board.get(row)[col] = 0;
    }
  }

  recurse(0, 0);

  console.log('Number of solutions for ' + n + ' queens:', queenCount);

  return queenCount;

  // if (n === 1 || n === 0) {
  //   return 1;
  // }


  // var startingPoints = [];
  // for (var _row = 0; _row < n; _row ++) {
  //   for (var _col = 0; _col < n; _col ++) {
  //     startingPoints.push([_row, _col]);
  //   }
  // }



  // var possibleNextDecision = function(board) {

  //   var possibleQueenPlacement = [];
  //   for (var row = 0; row < n; row++) {
  //     for (var col = 0; col < n; col++) {
  //       if (board.get(row)[col] !== 1) {
  //         board.get(row)[col] = 1;
  //         if (board.hasAnyQueensConflicts() === false) {
  //           possibleQueenPlacement.push([row, col]);
  //         }
  //         board.get(row)[col] = 0;
  //       }
  //     }
  //   }
  //   return possibleQueenPlacement;
  // };
  
  // var recursiveFunction = function(board, qCount) {
  //   var solution = [];
  //   var stringifiedSolution = [];
  //   if (qCount === n) {
  //     for (var rows = 0; rows < n; rows++) {
  //       solution.push(board.get(rows));
  //     }
  //     stringifiedSolution = JSON.stringify(solution);
  //     if (stringifiedSolutions.indexOf(stringifiedSolution) === -1) {
  //       solutions.push(solution);
  //       stringifiedSolutions.push(stringifiedSolution);

  //     }
  //   }
  //   var possibleNextQueenLocations = possibleNextDecision(board);
  //   if (possibleNextQueenLocations.length === 0) {
  //     return false;
  //   }
  //   for (var loc = 0; loc < possibleNextQueenLocations.length; loc++) {
  //     board.get(possibleNextQueenLocations[loc][0])[possibleNextQueenLocations[loc][1]] = 1;
  //     if (recursiveFunction(board, qCount+1) === false) {
  //       board.get(possibleNextQueenLocations[loc][0])[possibleNextQueenLocations[loc][1]] = 0;
  //     }
  //   }
  //   return false;
  // };

  // for (var startPoint = 0; startPoint < startingPoints.length; startPoint++) {
  //   var board = new Board({n: n});
  //   board.get(startingPoints[startPoint][0])[startingPoints[startPoint][1]] = 1;
  //   var queenCount = 1;
  //   recursiveFunction(board, queenCount);
  // }

////////////////////////////////
// uniq from underbar
/////////////////////////////////

// var _ = {};

// _.each = function(collection, iterator) {
//   if (Array.isArray(collection)) {
//     for (var i = 0; i < collection.length; i++) {
//       iterator(collection[i], i, collection);
//     }
//   }
//   else {
//     for (var key in collection) {
//       iterator(collection[key], key, collection);
//     }
//   }
// };

// _.indexOf = function(array, target){
//   var result = -1;

//   _.each(array, function(item, index) {
//     if (item === target && result === -1) {
//       result = index;
//     }
//   });

//   return result;
// };

// _.uniq = function(array) {
//   var uniques = [];
//   _.each(array, function(item) {
//     if (_.indexOf(uniques, item) === -1) {
//       uniques.push(item);
//     }
//   });
//   return uniques;
// };

////////////////////////////////

  console.log('Number of solutions for ' + n + ' queens:', queenCount);
  // if (n === 7) {
  //   console.log(solutions);
  // }
  // for (var p = 0; p < solutions.length; p++) {
  //   var b = new Board(solutions[p]);
  //   if(b.hasAnyQueensConflicts()) {
  //     console.log('this one is bad: ', stringifiedSolutions[p]);
  //   }
  //   // console.log(solutions[p]);
  // }
  // return _.uniq(stringifiedSolutions).length;
};




  /*
  ==========================================================================================
  Decision tree attempted solution with recursion
  ==========================================================================================
  */
  // var nodeBoard = new Board({n: 4});
  // // console.log('nodeBoard: ', nodeBoard);

  // var QueenNode = function(row, col, board, queenCount) {
  //   debugge r;
  //   var n = board.attributes.n;
  //   this.row = row;
  //   this.col = col;
  //   this.childQueens = [];
  //   // debugger;
  //   board.get(row)[col] = 1;
  //   if (row < n && col < n) {
  //     for (var i = 0; i < n; i++) {
  //       for (var j = 0; j < n; j++) {
  //         if (board.get(i)[j] === 0) {
  //           board.get(i)[j] = 1;
  //           if (board.hasAnyQueensConflicts()) {
  //             board.get(i)[j] = 0;
  //           } else {
  //             queenCount++;
  //             this.childQueens.push(new QueenNode(i, j, board, queenCount));
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  // var q = new QueenNode(0, 0, nodeBoard, 1);
  // console.log('q--------------------------------');
  // console.log(q);

  // /*
  // ==========================================================================================

  // ==========================================================================================
  // */

  // /*
  // ===========================================================================================
  // Matrix helper functions
  // ===========================================================================================
  // */

  // var rotate90DegreesCW = function(matrix) {
  //   var outputMatrix = [];
  //   var matrixSize = matrix.length;
  //   for (var row = 0; row < matrixSize; row++) {
  //     outputMatrix.push([]);
  //     for(var col = 0; col < matrixSize; col++) {
  //       outputMatrix[row][col] = matrix[matrixSize - col - 1][row];
  //     }
  //   }
  //   return outputMatrix;
  // };

  // var reflectAcrossVerticalAxis = function(matrix) {
  //   var outputMatrix = [];
  //   var matrixSize = matrix.length;
  //   for (var row = 0; row < matrixSize; row++) {
  //     outputMatrix.push([]);
  //     for(var col = 0; col < matrixSize; col++) {
  //       outputMatrix[row][col] = matrix[row][matrixSize - col - 1];
  //     }
  //   }
  //   return outputMatrix;
  // };

  // var reflectAcrossHorizontalAxis = function(matrix) {
  //   var outputMatrix = [];
  //   var matrixSize = matrix.length;
  //   for (var row = 0; row < matrixSize; row++) {
  //     outputMatrix.push([]);
  //     for(var col = 0; col < matrixSize; col++) {
  //       outputMatrix[row][col] = matrix[matrixSize - row - 1][col];
  //     }
  //   }
  //   return outputMatrix;
  // };

  // var rotate180Degrees = function(matrix) {
  //   return rotate90DegreesCW(rotate90DegreesCW(matrix));
  // };

  // var rotate90DegreesCounterCW = function(matrix) {
  //   return rotate90DegreesCW(rotate180Degrees(matrix));
  // };

  // var reflectAcrossMajorDiagonal = function(matrix) {
  //   return rotate90DegreesCW(reflectAcrossHorizontalAxis(matrix));
  // };

  // var reflectAcrossMinorDiagonal = function(matrix) {
  //   return rotate90DegreesCW(reflectAcrossVerticalAxis(matrix));
  // };

  // /*
  // ===========================================================================================
  // ===========================================================================================
  // */


  // var solutionsArray = [];
  // var board ;
  // var queenCount;
  // var solution;

  // if (n === 1 || n === 0) {
  //   return 1;
  // }
  
  // var attempt = [];
  // for (var i = 0; i < n; i++) {
  //   for (var j = 0; j < n; j++) {
  //     attempt.push([i, j]);
  //   }
  // }

  // // console.log(attempt.length);

  // for (var attemptNum = 0; attemptNum < attempt.length; attemptNum++) {
  //   board = new Board({n: n});
  //   queenCount = 1;
  //   solution = [];
  //   var solutionFound = false;
  //   var queenLocations = [];
  //   board.get(attempt[attemptNum][0])[attempt[attemptNum][1]] = 1;
  //   for (var row = 0; row < n; row++) {
  //     if (solutionFound) {
  //       break;
  //     }
  //     for (var col = 0; col < n; col++) {
  //       if (solutionFound) {
  //         break;
  //       }
  //       if (row === attempt[attemptNum][0] && col === attempt[attemptNum][1] && n !== 1) {
  //         continue;
  //       }
  //       board.get(row)[col] = 1;
  //       if (board.hasAnyQueensConflicts() === true) {
  //         board.get(row)[col] = 0;
  //       } else if (n !== 1) {
  //           queenCount++;
  //           //push [row, coll] to queen locations array
  //         }
  //       if (queenCount === n) {
  //         for (var k = 0; k < n; k++) {
  //           solution.push(board.get(k));
  //         }
  //         solutionFound = true;
  //         var differentSolutions = [];
  //         differentSolutions.push(solution);
  //         differentSolutions.push(rotate90DegreesCW(solution));
  //         differentSolutions.push(rotate180Degrees(solution));
  //         differentSolutions.push(reflectAcrossHorizontalAxis(solution));
  //         differentSolutions.push(reflectAcrossVerticalAxis(solution));
  //         differentSolutions.push(rotate90DegreesCounterCW(solution));
  //         differentSolutions.push(reflectAcrossMajorDiagonal(solution));
  //         differentSolutions.push(reflectAcrossMinorDiagonal(solution));
          
  //         for (var count = 0; count < differentSolutions.length; count++) {
  //           differentSolutions[count] = JSON.stringify(differentSolutions[count]);
  //           if (solutionsArray.indexOf(differentSolutions[count]) === -1) {
  //             // console.log(solutionsArray);
  //             solutionsArray.push(differentSolutions[count]);
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // // return (n === 0) ? [] : {n: n};

  // console.log('Number of solutions for ' + n + ' queens:', solutionsArray.length);
  // return solutionsArray.length;
// };
