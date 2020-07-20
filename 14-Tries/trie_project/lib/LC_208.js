// LC 208 Implement Trie (Prefix Tree)
// MEDIUM
// https://leetcode.com/problems/implement-trie-prefix-tree/
// 
// Implement a trie with #insert, #search, and #startsWith methods.
// Note:
// You may assume that all inputs are consist of lowercase letters a - z.
// All inputs are guaranteed to be non - empty strings.
// 
// Example:
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // returns true
// trie.search("app");     // returns false
// trie.startsWith("app"); // returns true
// trie.insert("app");
// trie.search("app");     // returns true


// *****************************************************************************
// VERSION 1-
class Node {
  constructor() {
    this.children = {};
    this.isTerminal = false;
  }
}


var Trie = function () {
  this.root = new Node();
};


// Inserts a word into the trie. 
// (string) => undefined
Trie.prototype.insert = function (word) {
  let node = this.root;           
  for (let i = 0; i < word.length; i++) {     // loop through word
    let letter = word[i];
    if (!(letter in node.children)) {         // if letter not an edge of children, make it one
      node.children[letter] = new Node();     
    }
    node = node.children[letter];
  }
  node.isTerminal = true;
};


// Returns true if the word is in the trie. 
// (string) => boolean
Trie.prototype.search = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (!(letter in node.children)) return false;
    node = node.children[letter];
  }
  return node.isTerminal;
};


// Returns true if there is ANY word in the trie that starts with the given prefix
// (string) => boolean
Trie.prototype.startsWith = function (prefix) {
  let node = this.root;
  for (let i = 0; i < prefix.length; i++) {
    let letter = prefix[i];
    if (!(letter in node.children)) return false;
    node = node.children[letter];
  }
  return true;
};


// EXAMPLE 1:
let myTrie = new Trie();
myTrie.insert('ten');
myTrie.insert('tea');
//         O        = root node
//      t / 
//       O            
//    e /  
//     O   
//  n / \ a
//   O   O          = terminal nodes
// console.log(myTrie.root.children);                                                          //=> { 't':Node{ children:{'e':Node}, isTerminal:false } }
// console.log(Object.keys(myTrie.root.children));                                             //=> ['t']
// console.log(' ');
// console.log(Object.keys(myTrie.root.children['t'].children));                               //=> ['e']
// console.log(Object.keys(myTrie.root.children['t'].children['e'].children));                 //=> ['n']
// console.log(myTrie.root.children['t'].children['e'].isTerminal);                            //=> false
// console.log(Object.keys(myTrie.root.children['t'].children['e'].children['n'].children));   //=> []
// console.log(myTrie.root.children['t'].children['e'].children['n'].isTerminal);              //=> true

// console.log(myTrie.search('ten'));       //=> true
// console.log(myTrie.search('tea'));       //=> true
// console.log(myTrie.search('t'));         //=> false
// console.log(myTrie.search('ta'));        //=> false
// console.log(myTrie.search('tend'));      //=> false

console.log(myTrie.startsWith('t'));     // true   
console.log(myTrie.startsWith('te'));    // true   
console.log(myTrie.startsWith('ten'));   // true   
console.log(myTrie.startsWith('tea'));   // true   
console.log(myTrie.startsWith('ted'));   // false
console.log(myTrie.startsWith('tend'));  // false
console.log(myTrie.startsWith('ta'));    // false
