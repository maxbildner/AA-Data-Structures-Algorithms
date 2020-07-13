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
// class GraphNode {
//   constructor(val) {
//     this.val = val;
//     this.neighbors = [];                                                        // contains references to other nodes
//   }
// }


// Example 1:
// let a = new GraphNode('a');
// let b = new GraphNode('b');
// let c = new GraphNode('c');
// let d = new GraphNode('d');
// let e = new GraphNode('e');
// let f = new GraphNode('f');
// a.neighbors = [b, c, e];
// c.neighbors = [b, d];
// e.neighbors = [a];
// f.neighbors = [e];
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


// *****************************************************************************
// 4) Graph Traversals- DEPTH FIRST using Nodes and neighbors array
//      E  ↔  A → B
//      ↑     ↓ ↗
//      F     C
//            ↓
//            D
// - we'll make F our starting "root" since it can access other nodes
// - DF =  F  E  A  B  C  D

class GraphNode {
  constructor(val) {
    this.val = val;
    this.neighbors = [];                                                        // contains references to other nodes
  }
}

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

// VERSION 1- RECURSIVE, Only works if node values are unique!
function depthFirstRecur(node, visited=new Set()) {
  if (visited.has(node.val)) return;                                            // exit if node has already been visited

  console.log(node.val);
  visited.add(node.val);                                                        // add node val to set

  node.neighbors.forEach(neighbor => {
    depthFirstRecur(neighbor, visited);
  });
}

// depthFirstRecur(f);   //=> 
// 'f'
// 'e'
// 'a'
// 'b'
// 'c'
// 'd'


// VERSION 2- ITERATIVE, Only works if node values are unique!
function depthFirstIter(node) {
  let visited = new Set();
  let stack = [ node ];

  while (stack.length) {
    let node = stack.pop();                                                     // remove last node from stack (we're going to "visit" this node)

    if (visited.has(node.val)) continue;                                        // skip this node, if we've visited it already

    console.log(node.val);                                                      // print out node val, and mark as visited
    visited.add(node.val);

    stack.push(...node.neighbors);                                              // add nodes neighbors to stack to be explored
  }
}

// depthFirstIter(f);   //=> 
// 'f'
// 'e'
// 'a'
// 'b'
// 'c'
// 'd'




// *****************************************************************************
// 5) Graph Traversals- DEPTH FIRST using Adjacency List
//      E  ↔  A → B
//      ↑     ↓ ↗
//      F     C
//            ↓
//            D
// - we'll make F our starting "root" since it can access other nodes
// - DF =  F  E  A  B  C  D
let graph2 = {
  'a': ['b', 'c', 'e'],
  'b': [],
  'c': ['b', 'd'],
  'd': [],
  'e': ['a'],
  'f': ['e']
};


// VERSION 3- RECURSIVE, Only works if values are unique! 
// NOT THE BEST BEC all nodes may not be reached if you pick a poor root/start
function depthFirstRecurV2(node, graph, visited=new Set()) {
  if (visited.has(node)) return;                                                // exit if node has already been visited

  console.log(node);
  visited.add(node);                                                            // add node to set

  graph[node].forEach(neighbor => {
    depthFirstRecurV2(neighbor, graph, visited);
  });
}

// depthFirstRecurV2('f', graph2);   //=> 
// 'f'
// 'e'
// 'a'
// 'b'
// 'c'
// 'd'


// VERSION 4- ITERATIVE, Only works if values are unique! 
// ALL nodes ARE reached even if you pick a poor root/start
function depthFirst(graph) {
  let visited = new Set();

  for (let node in graph) {                                                     // loop through all keys (nodes) in graph
    _depthFirstRecur(node, graph, visited);
  }
}

// HELPER
function _depthFirstRecur(node, graph, visited) {
  if (visited.has(node)) return;

  console.log(node);
  visited.add(node);

  graph[node].forEach(neighbor => {
    _depthFirstRecur(neighbor, graph, visited);
  });
}

// depthFirst(graph2);   //=> 
// 'f'
// 'e'
// 'a'
// 'b'
// 'c'
// 'd'

// EXAMPLE 2 (1 graph, but disconnected)
let graph3 = {
  'h': ['i', 'j'],
  'i': [],
  'j': ['k'],
  'k': [],
  'l': ['m'],
  'm': []
};
//      H  →  I   L
//      ↑         ↓ 
//      J         M
//      ↓     
//      K  
// depthFirst(graph3);   //=> h, i, j, k, l, m
// https://open.appacademy.io/learn/self-study/data-structures-and-algorithms/graph-traversal-notes