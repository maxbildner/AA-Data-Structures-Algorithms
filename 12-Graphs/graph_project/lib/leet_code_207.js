// LC 207 Course Schedule
// MEDIUM
// https://leetcode.com/problems/course-schedule/
// INPUTS: Number, Array (2D) 
//   Number = numCourses you have to take
//   Array = Graph represented by an array of arrays (with 2 number pairs)
// OUTPUT: boolean
// 
// There are a total of numCourses courses you have to take, labeled from 0 to 
// numCourses - 1. Some courses may have prerequisites, for example to take 
// course 0 you have to first take course 1, which is expressed as a pair: [0, 1]
// Given the total number of courses and a list of prerequisite pairs, is it 
// possible for you to finish all courses ?
// 
// Constraints:
// - The input prerequisites is a graph represented by a list of edges, not 
//   adjacency matrices. Read more about how a graph is represented.
// - You may assume that there are no duplicate edges in the input prerequisites
// - 1 <= numCourses <= 10 ^ 5
//
// EXAMPLE 1:
// Input:   numCourses = 2, prerequisites = [[1, 0]]
// Output:  true
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0. So it is possible.
//
// EXAMPLE 2:
// Input:  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
// Output: false
// Explanation: There are a total of 2 courses to take.
// To take course 1 you should have finished course 0, and to take course 0 you 
// should also have finished course 1. So it is impossible.
//
// - there could be a scenario where a prereq course doesn't have it's own
//   prereq, but lets still put it in the graph (as a key)
// - ? can there be multiple preqs for a course? or always pairs (i.e. 1)?


// *****************************************************************************
// VERSION 1- AA SOLUTION- TOPOLOGICAL SORT (using graph). Can only visit node, when all of surrounding nodes have been visited
// TIME COMPLEXITY:   O(E + V),   E = Number of courses, V = number of dependencies
//    takes us E time to build graph, then like a DFS takes E + V to traverse
//    E + E + V  ->   2E + V    -> E + V
// SPACE COMPLEXITY:  O(E + V)
// (2, [[1,0], [0,1]])    =>  false
// (2, [[1,0]])           =>  true
function canFinish(numCourses, prerequisites) {
  
  let prereq = buildGraph(prerequisites);   //=> { '0':[], '1': [ '0' ] }       // 1) build graph where keys are course numbers, values are prerequisite courses 
  // ex. prereq['a']  => gives you list of all prereqs for course 'a'
  
  // edge case if (1, []) need to take 1 course, but no prereqs/graph
  // we never use numCourses, because we're using totalCourses (numCourses implicitly factored in with prereq graph)?
  let totalCourses = Object.keys(prereq).length;                                // get total num courses- number of keys in prereq graph

  let completed = new Set();                                                    // 2) set to hold courses able to be completed
  
  // it's not possible to complete a list of courses when there's a cycle in the graph (infinite loop)
  // need a way to check for a cycle
  let eligibleCourseExists = true;                                              // bool flag to break out of loop/check for cycles

  while (eligibleCourseExists) {                                                // wrap looping of keys in prereq in loop (like bubble sort with boolean flag)

    eligibleCourseExists = false;                                               // toggle flag to false (like bubble sort)

    // traverse graph and choose which courses are available
    for (let course in prereq) {                                                // loop through keys in graph
      // 1: course = '0'    prereq = { '0':[], '1': [ '0' ] }

      let everyPreMet = prereq[course].every(pre => completed.has(pre));        // check if every prereq for course has been completed
      // 1: everyPreMet = true

      if (!completed.has(course) && everyPreMet) {                              // if course has NOT been completed AND everyPrereq met
        completed.add(course);                                                  // add course to completed
        // 1: completed = [ '0' ]      

        eligibleCourseExists = true;                                            // toggle flag true, if able to choose some course
      }
    }
  }

  return completed.size === totalCourses;                                       // check if number of courses able to be completed == totalCourses requried to take
}


// HELPER 
// ([ [1,0] ])    =>    { '0':[], '1': [ '0' ] }
// - maps courses to array of required courses (prereqs)
// - course 1 is dependend on course 0
function buildGraph(list) {
  let graph = {};
  // keys = (String/Number) course number
  // values = (Array 2D) prerequisites for corresponding course
  
  list.forEach(prereq => {                                                      // loop through prereq list
    // create vars for course and prereq (through array deconstruction), convert them to strings so we have keys and inner values of same datatype
    let [ course, pre ] = prereq.map(String);
    // 1: course = '1'    pre = '0'

    // check if course is a key in graph object (i.e. course already in graph)
    if (course in graph) {
      graph[course].push(pre);                                                  // push pre to the value/array at at that key course

    } else {                                                                    // course not in graph
      graph[course] = [ pre ];                                                  // initialize the course as a key in graph, with value array of pre
      // 1: graph = { '1': [ '0' ] }                                            // course 1 requires courses 0
    }

    // could be a scenario where a prereq course doesn't have it's own prereq, 
    // but lets still put it in the graph
    if (!(pre in graph)) {                                                      // if pre is not a key in graph
      graph[pre] = [];                                                          // add it to the graph (initialize to empty array, since it doesnt have prereqs)
    }
  });

  return graph;
}


// EXAMPLES:
// console.log(canFinish(2, [[1, 0], [0, 1]]));     //=> false
// console.log(canFinish(1, []));                   //=> true
console.log(canFinish(2, [[1, 0]]));                //=> true


