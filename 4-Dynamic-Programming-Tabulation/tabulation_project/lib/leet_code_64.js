// LC 64 Minimum Path Sum
// MEDIUM
// https://leetcode.com/problems/minimum-path-sum/ 
// Given a m x n grid filled with non - negative numbers, find a path from top 
// left to bottom right which minimizes the sum of all numbers along its path.
// Note: You can only move either down or right at any point in time.
// 
// Ex:
// Input:
// [
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1]
// ]
// Output: 7
// Explanation: Because the path 1→3→1→1→1 minimizes the sum.


// AA SOLUTION 1-
function minPathSum(grid) {
  // 1) get height and width of input grid
  // get height
  let h = grid.length;
  // m = 3

  // get width
  let w = grid[0].length;
  // n = 3

  // 2) create table (2D array) same dimensions as input grid, fill w/ infinitys
  let table = new Array(h).fill().map(() => new Array(w).fill(Infinity));
  // table = 
  // [ [Infinity, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity] ]

  // 3) populate first value in table with first num value in input grid
  // this is the most basic case bec if the grid only has 1 ele, the fastest path/sum will be that element
  table[0][0] = grid[0][0];
  // table = 
  // [ [1, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity],
  //   [Infinity, Infinity, Infinity] ]

  // loop through each row in grid/table
  for (let i = 0; i < h; i++) {

    // loop through each column in grid/table
    for (let j = 0; j < w; j++) {

      // if outer counter (row) < height - 1
      // we have - 1 because array indexing starts at 0 not 1
      // i = 0, j = 0:  0 < 3 - 1   0 < 2   true
      // i = 0, j = 1:  0 < 3 - 1   0 < 2   true
      if (i < h - 1) {

        // populate table @position NEXT row, CURRENT col with min of:
        //  current table value + grid value 1 ROW down 
        //  or
        //  table value 1 ROW down
        table[i + 1][j] = Math.min(table[i][j] + grid[i + 1][j], table[i + 1][j]);
        // i = 0, j = 0: 
        // Math.min(table[0][0] + grid[0 + 1][0], table[0 + 1][0])
        // Math.min(1 + 1, Infinity)
        // = 2
        // table = [
        //  [ 1, Infinity, Infinity ],
        //  [ 2, Infinity, Infinity ],
        //  [ Infinity, Infinity, Infinity ] ]

        // i = 0, j = 1: 
        // Math.min(table[0][1] + grid[0 + 1][1], table[0 + 1][1])
        // Math.min(4 + 5, Infinity)
        // = 9
        // table = [
        //  [ 1, 4, Infinity ],
        //  [ 2, 9, Infinity ],
        //  [ Infinity, Infinity, Infinity ] ]
      }

      // if inner counter (col) < width - 1
      // 0 = 0, j = 0:  0 < 3 - 1   0 < 2   true
      // 0 = 0, j = 1:  1 < 3 - 1   1 < 2   true
      if (j < w - 1) {

        // populate table @position CURRENT row, NEXT col with min of:
        //  current table val + grid val one COL over (right)
        //  or
        //  table val 1 COL over (right)
        table[i][j + 1] = Math.min(table[i][j] + grid[i][j + 1], table[i][j + 1]);
        // i = 0, j = 0: 
        // Math.min(table[0][0] + grid[0][0 + 1], table[0][0 + 1])
        // Math.min(1 + 3, Infinity)
        // = 4
        // table = [
        //  [ 1, 4, Infinity ],
        //  [ 2, Infinity, Infinity ],
        //  [ Infinity, Infinity, Infinity ] ]

        // if (j === 2 && i === 0) console.log(table);
        // i = 0, j = 1: 
        // Math.min(table[0][1] + grid[0][1 + 1], table[0][1 + 1])
        // Math.min(4 + 1, Infinity)
        // = 5
        // table = [
        //  [ 1, 4, 5 ],
        //  [ 2, 9, Infinity ],
        //  [ Infinity, Infinity, Infinity ] ]
      }
      if (j === 0 && i === 1) console.log(table);
    }
  }

  // return bottom right value in table @position last row, last col
  return table[h - 1][w - 1];
}


let grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];
console.log(minPathSum(grid));