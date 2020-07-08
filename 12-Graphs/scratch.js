// Notes From Reading:
// Graphs
// - Very broad ADT(Abstract Data Structure)
// - Graph = collection of nodes and any edges between those nodes
//    - nodes = contain value and pointer(s) to another node
//    - edges = arrows pointing to other nodes
// - Linked Lists and Trees are both types of Graphs
// - may lack a root node



// *****************************************************************************
// 1) Clunky Graph Implementation
class GraphNode {
  constructor(val) {
    this.val = val;
    this.neighbors = [];                                                        // contains references to other nodes
  }
}


// Example 1:
let a = new GraphNode('a');
let b = new GraphNode('b');
let c = new GraphNode('c');
let d = new GraphNode('d');
let e = new GraphNode('e');
let f = new GraphNode('f');
a.neighbors = [b, c, e];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
// GRAPH 1:
//      E  ↔  A → B
//      ↑     ↓ ↗
//      F     C
//            ↓
//            D
// 
// arrow keycodes: https://www.alt-codes.net/arrow_alt_codes.php
// 
// - Above implementation is meh because we have no way to reference the entire 
//   graph (no root)



// *****************************************************************************
// 2) Adjacency Matrix
// - use a 2D array (matrix) to represent edges
// - map each node's value to an index
// 
//      E  ↔  A → B               4  ↔  0 → 1
//      ↑     ↓ ↗                 ↑     ↓ ↗
//      F     C         =>        5     2       
//            ↓                         ↓
//            D                         3
// 
// - each row in matrix refers to source of an edge, and column index its 
//   destination. (true = there is an edge from source to destination)
let matrix = [
/*SOURCE    A       B      C      D      E      F      DESTINATION */ 
/*A*/     [true,  true,  true,  false, true,  false],
/*B*/     [false, true,  false, false, false, false],
/*C*/     [false, true,  true,  true,  false, false],
/*D*/     [false, false, false, true,  false, false],
/*E*/     [true,  false, false, false, true,  false],
/*F*/     [false, false, false, false, true,  true ]
];
// - when the edges have direction, matrix[i][j] may not be the same as 
//   matrix[j][i]
// - it is common to say that a node is adjacent to itself, so 
//   matrix[x][x] === true for any x
// - Disadvantage: N^2 Space for 2D array



// *****************************************************************************
// 3) Adjacency List
// - seeks to solve disadvantage of Adjacency Matrix
// - use an object where keys represent the node labels.The values associated 
//   with the keys will be an array containing all adjacent nodes
let graph = {
  'a': ['b', 'c', 'e'],
  'b': [],
  'c': ['b', 'd'],
  'd': [],
  'e': ['a'],
  'f': ['e']
};
// - Space = number of edges