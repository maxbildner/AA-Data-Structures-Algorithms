// DIJKSTRAS Algorithm
// - Helps us solve the following problem:
//   Given a graph with weighted edges and a source node, calculate the shortest 
//   path between that source and all other nodes in the graph.
// 
// EXAMPLE:
// - graph visualization below:
// - Numbers = weights between nodes
//
//            F
//         /     \
//      4 /       \ 9
//       /         \ 
//      /  20    5  \ 
//     C ---- D ---- E         
//     |      |    /
//   1 |   12 |   / 13
//     |      |  /
//     A ---- B /
//        7

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
// console.log(dijkstras(graph, 'a'));
//=>
// {
//   distance: { a: 0, b: 7, c: 1, d: 19, e: 14, f: 5 },
//   previous: { c: 'a', b: 'a', d: 'b', f: 'c', e: 'f' }
// }
// distance = total numerical distance of optimal paths from source to any node
// previous = order of nodes to travel if we want to take an
//            optimal path from the source to any node
//            key = node,  value = previous node we should take to get to that node
//            Ex. if key = 'f', then value = previous node we should take
//                              before 'f' if we want to from 'a' to 'f'        


function dijkstras(graph, source) {
  // 1) initialize a distance object to return later
  //    keys   = node letters
  //    values = distance objects which map a neighbor to the distance to that 
  //             neighbor from this node
  // distance = { a:0, b:Infinity, c:Infinity, d:Infinity, e:Infinity, f:Infinity }
  let distance = {};
  for (let letter in graph) {
    distance[letter] = Infinity;                                                // We choose Infinity so we can easily overwrite later (and bec we don't know actual)
  }
  distance[source] = 0;                                                         // obviously the distance between the source node and itself = 0

  let unvisited = new Set(Object.keys(graph));                                  // 2) variable to track unsivisted nodes
  // unvisited = { 'a', 'b', 'c', 'd', 'e', 'f' }

  let previous = {};                                                            // obj where key = node,  value = previous node we should take before node if we wanna go from source to that node

  while (unvisited.size > 0) {                                                  // 3) keep looping until we've visited all nodes
  
    let currNode = getSmallestNode(unvisited, distance);                        // 4) find unvisited node with currently smallest distance value
    // 1, 1:  currNode = 'a'

    unvisited.delete(currNode);                                                 // 5) mark currNode as visited

    for (let neighbor in graph[currNode]) {                                     // 6) consider all neighbor edges coming out of current node
      // 1, 1:  neighbor = 'c',   graph[currNode] = { 'c': 1, 'b': 7 }

      let distanceToNeighbor = graph[currNode][neighbor]                        // distance from currNode to neighbor node
      let distanceToSource = distance[currNode];                                // distance from currNode to SOURCE node (from distance obj)
      // 1, 1:  distanceToNeighbor = 1,     distanceToSource = 0

      let totalDistance = distanceToNeighbor + distanceToSource;                // totalDistance = distanceToNeighbor + distanceToSource
      // 1, 1:  totalDistance = 1 + 0  = 1

      // distance[neighbor] = distance from SOURCE to neighbor (from dist obj)
      if (totalDistance < distance[neighbor]) {                                 // 7) if totalDistance better than distance currently in distance obj, update distance obj!
        // 1, 1:    1 < Infinity   true

        distance[neighbor] = totalDistance;
        // 1, 1:    distance = { a: 0, b: Infinity, c: 1, d: Infinity, e: Infinity, f: Infinity }

        previous[neighbor] = currNode;                                          // 8) update previous obj
      }
    }
  }

  return { distance, previous };
}
// previous = { c: 'a', b: 'a', d: 'b', f: 'c', e: 'f' }
// distance = { a: 0, b: 7, c: 1, d: 19, e: 14, f: 5 }
//            5
//            F
//         /     \
//       4/       \9
//       /         \ 
//      /  20    5  \ 
//   1 C ---- D ---- E 14       <- 14 = best total distance from source to node E
//     |      19    /
//     |      |    /
//    1|    12|   /13
//     |      |  /
//     A ---- B /
//        7   7



// HELPER- gets unvisited node which currently has smallest distance
// { 'a', 'b', 'c', 'd', 'e', 'f' },  { a: 0, b: Infinity, c: Infinity, d: Infinity, e: Infinity, f: Infinity }  =>  'a'
function getSmallestNode(unvisited, distance) {
  let arr = Array.from(unvisited);                                              // convert set of strings into aray of strings

  return arr.reduce((minNode, node) => {                                        // find unvisited node in distance with smallest val
    if (distance[node] < distance[minNode]) {
      return node;
    } else {
      return minNode;
    }
  });
}



// *****************************************************************************
// uses dijkstras algo to tell you best path (which nodes to take) in order to
// get from source node to end node
// (graph, source, end) => obj { path: array, distance: number } 

// (graph, 'a', 'f', ) => { path: [ 'a', 'c', 'f' ], distance: 5 }
function quickestPath(graph, source, end) {
  let { distance, previous } = dijkstras(graph, source);                        // 1) use dijkstra to get previous path obj
  // previoius = { c: 'a', b: 'a', d: 'b', f: 'c', e: 'f' }
  // distance  = { a: 0, b: 7, c: 1, d: 19, e: 14, f: 5 }

  let path = [ end ];
  let currNode = end;

  let reachedSource = false;                                                    // boolean flag like bubble sort
  while (!reachedSource) {                                                      // 2) keep looping until we get from end to source

    let prev = previous[currNode];

    path.push(prev);

    currNode = prev;                                                            // update end

    if (currNode === source) reachedSource = true;                              // break out of loop if we reached source
  }

  return { path: path.reverse(), distance: distance[end] };
}

console.log(quickestPath(graph, 'a', 'f'));                                     //=>  { path: [ 'a', 'c', 'f' ], distance: 5 }
// console.log(quickestPath(graph, 'a', 'e'));                                  //=>  { path: [ 'a', 'c', 'f', 'e' ], distance: 14 }