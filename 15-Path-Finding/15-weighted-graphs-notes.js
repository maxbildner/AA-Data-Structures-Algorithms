// PATH FINDING- WEIGHTED GRAPHS
// 1) WEIGHTED GRAPHS
// - unweighted graph = graph where all edge weights are equal
// - weighted graph = graph where all edge weights are not equal



// *****************************************************************************
// 2) Representing a weighted graph
// - Old way for uniform weight (Adjacency List)
// let graphUniform = {
//   'h': ['i', 'j'],
//   'i': [],
//   'j': ['k'],
//   'k': [],
//   'l': ['m'],
//   'm': []
// };
// 
// - New Way- Values at keys are distance objects instead of arrays
//   which maps a neighbor to the distance to that neighbor from this node
let graphWeighted = {
  'a': { 'c': 1, 'b': 7 },
  'b': { 'a': 7, 'd': 12, 'e': 13 },
  'c': { 'a': 1, 'd': 20, 'f': 4 },
  'd': { 'b': 12, 'c': 20, 'e': 5 },
  'e': { 'b': 13, 'd': 5, 'f': 9 },
  'f': { 'c': 4, 'e': 9 }
};
//  - Note graph is not directed (i.e. cost of traveling from a to b)
//    is the same as from b to a


// *****************************************************************************
// 3) Why are weighted graphs important?
// - allows us to capture real world scenarios where we need to factor in
//   the cost of moving from one entity to another
// - Ex. Finding shortest path distance wise
// - Ex. Finding cheapest way to get from one place to another (flight costs)



// *****************************************************************************
// 4) DIJKSTRAS Algorithm
// - Helps us solve the following problem:
//   Given a graph with weighted edges and a source node, calculate the shortest 
//   path between that source and all other nodes in the graph.
let graph = {
  'a': { 'c': 1, 'b': 7 },
  'b': { 'a': 7, 'd': 12, 'e': 13 },
  'c': { 'a': 1, 'd': 20, 'f': 4 },
  'd': { 'b': 12, 'c': 20, 'e': 5 },
  'e': { 'b': 13, 'd': 5, 'f': 9 },
  'f': { 'c': 4, 'e': 9 }
};
// TIME COMPLEXITY:  O(N^2),    N = num nodes in graph
//    N * N + N   =>  N^2
//    O(N) = outer loop through keys in graph
//    O(N) = minDistanceNode helper loops n times through every unvisted node
//    O(N) = inner for loop only loops once for every edge, so doesnt increase time
// SPACE COMPLEXITY: ?

// (graph as adjacencylist, source) => { distance, previous }
console.log(dijkstras(graph, 'a'));
//=>
// {
//   distance: { a: 0, b: 7, c: 1, d: 19, e: 14, f: 5 },
//   previous: { c: 'a', b: 'a', d: 'b', f: 'c', e: 'f' }
// }
// distance = total numerical distance of optimal paths from source to any node
// previous = order of nodes to travel if we want to take an
//            optimal path from the source to any node


function dijkstras(graph, source) {
  let distance = {};

  // intialize all nodes to be Infinity distance away from source
  for (let node in graph) {
    distance[node] = Infinity;
  }

  // the source is 0 distance away from itself
  distance[source] = 0;
  // distance = {
  //    a: 0,
  //    b: Infinity,      // distance from node a to node b
  //    c: Infinity,      // distance from node a to node c
  //    d: Infinity,      // Infinity bec. we need a default val we can easily replace later
  //    e: Infinity,
  //    f: Infinity 
  // }

  // initialize all nodes to be unvisited
  let unvisited = new Set(Object.keys(graph));
  // unvisited = { 'a', 'b', 'c', 'd', 'e', 'f' }

  // create an object to track the optimal paths
  let previous = {};
  // at the end of this algo, we want previous = 
  //    { c: 'a',  b: 'a',  d: 'b',  f: 'c',  e: 'f' }
  // previous  = order of nodes to travel if we want to take an
  //             optimal path from the source to any node

  // loop until all nodes have been visited.
  // each loop select unvisited node that has smallest distance from the source
  // while some nodes are still unvisited
  while (unvisited.size > 0) {
    // 1:  6 > 0    true

    // find the closest unvisted node (between source and unvisited nodes)
    let currNode = minDistanceNode(unvisited, distance);
    // 1: currNode = 'a'

    // and mark it as visited
    unvisited.delete(currNode);
    // 1: unvisited = { 'b', 'c', 'd', 'e', 'f' }

    // consider all neighbors of the current node
    for (let neighbor in graph[currNode]) {   
      // 1, 1: neighbor = 'c'   graph['a'] = { 'c': 1, 'b': 7 }

      // calculate the total distance of the neighbor
      //    through the current node to get to that neighbor
      let distanceFromCurrToNeighbor = graph[currNode][neighbor];
      // 1, 1: distanceFromCurrToNeighbor = 1
      
      let totalNeighborDistance = distance[currNode] + distanceFromCurrToNeighbor;
      // 1, 1: totalNeighborDistance = distance['a'] + 1  = 0 + 1   = 1

      // if the total distance is better than the old distance we calculated for neighbor,
      if (totalNeighborDistance < distance[neighbor]) {
        // 1, 1:  1 < distance['c']    1 < Infinity   true

        // then replace it
        distance[neighbor] = totalNeighborDistance;
        // 1, 1:  distance['c'] = 1

        // and now we say that the optimal path has `currNode` followed by `neighbor`
        previous[neighbor] = currNode;
        // 1, 1:  previous['c'] = 'a'     previous = { 'c':'a' }
      }
    }
  }

  return { distance, previous };
}


// HELPER- finds the unvisited node with the smallest distance
// nodes = unvisited = { 'a', 'b', 'c', 'd', 'e', 'f' }
// distance = { a:0, b:Infinity, c:Infinity, d:Infinity, e:Infinity, f:Infinity }
function minDistanceNode(nodes, distance) {
  // Array.from(nodes) == ['a', 'b', 'c', 'd', 'e', 'f' ]
  
  // if 'a' is node, find shortest distance between a and any other node
  // answer = a bec. distance between a and a = 0
  return Array.from(nodes).reduce((minNode, node) => {
    // 1: minNode = 'a',    node = 'b'

    // 1: distance['b'] < distance['a']    Infinty < 0    false   => 'a'
    return distance[node] < distance[minNode] ? node : minNode;
  });
}

// let newSet = new Set(['a', 'b', 'c', 'd', 'e', 'f']);
// console.log(minDistanceNode(newSet, { a: 0, b: Infinity, c: Infinity, d: Infinity, e: Infinity, f: Infinity } ));
//=> 'a'