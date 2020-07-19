// 1) TRIES (PREFIX TREES) NOTES
// - Type of search tree used to efficiently store a set of strings for later 
//   retrieval
// - Path from root to any node in trie represents a prefix of at least on 
//   string in the set
// - Can create a trie as a class with many nodes
// - Values are NOT stored in nodes, VALUES ARE STORED IN EACH EDGE that leaves
//   a node
// - Trie is NOT a binary tree, so trie can have any number of children
// - a word recognized by tree must begin at root and end at terminal



// *****************************************************************************
// 2) Trie Node Implementation (not a full trie yet)
class Node {
  constructor() {
    this.children = {};                    // keys = edges (values),   values = node
    this.isTerminal = false;
  }
}

let root = new Node();
root.children['z'] = new Node();
// root == { children: {'z':Node{} } }
root.children['a'] = new Node();
// root == { children: {'z':Node{}, 'a':Node{} } }
root.children['b'] = new Node();
// root == { children: {'z':Node{}, 'a':Node{}, 'b':Node{} } }

// Visualization:
// O = Node
//          O
//        / | \
//     z / a|  \b           
//      /   |   \
//     O    O    O
//
// NOT a full trie yet!!!


// *****************************************************************************
// 3) Trie Class Implementation (uses Node class)
// TIME COMPLEXITY:   
//    #insert()      O(M)      M = length of target word
//    #search()
// SPACE COMPLEXITY: O(N * M)  N = number of words in tree, M = maximum Length of any word
//    #insert()      worst case, no overlapping prefixes
//    #search()      space dependent on how often prefixes overlap

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word, root=this.root) {
    // take first letter of the word
    let letter = word[0];        
    // 1: letter = "t"                                               
    // 2: letter = "e"                                               
    // 3: letter = "n"                                               

    // if the current root doesn't have an outgoing edge for the given letter 
    // then we must create a new edge for the letter and point it to a new destination node
    if (!(letter in root.children)) {
      // 1: "t" in root == { children:{} }     no edge 't' in children, so true
      // 2: "e" in root == { children:{} }     no edge 'e' in children, so true
      // 3: "n" in root == { children:{} }     no edge 'n' in children, so true
      
      root.children[letter] = new Node();
      // 1: root == { children:{'t':Node{}} }
      // 2: root == { children:{'e':Node{}} }
      // 3: root == { children:{'n':Node{}} }
    }
   
    // if there are no other characters in the word, then mark the destination node as terminal
    if (word.length === 1) {
      root.children[letter].isTerminal = true;
      
      // otherwise we have remaining characters so recursively insert them into the destination node
    } else {    
      this.insert(word.slice(1), root.children[letter]);
      // 1: this.insert('en', 't':Node{})
      // 2: this.insert('n',  'e':Node{})
    }
    // console.log(root.children)   Note nesting
    //   root = 
    //   { 
    //     children: 
    //     {
    //       't':Node{
    //         children:{'e':Node {
    //           children:{'n':Node {
    //             children:{},
    //             isTerminal: true
    //           }}
    //         }}
    //       }
    //     }
    //   }
  }


  // returns boolean, true if word is in Trie
  search(word, root=this.root) {
    if (word.length === 0) {
      if (root.isTerminal) {
        // the word is recognized if it is empty and the current node is terminal
        return true;

      } else {
        // the word is not recognized if it is empty and the current node is nonterminal
        return false;
      }
    }

    // take the first letter of the word
    let letter = word[0];

    // if there is an edge for this letter
    if (letter in root.children) {

      // then recursively check the subtree rooted at the edge's destination with the remaining characters
      return this.search(word.slice(1), root.children[letter]);
    } else {

      // otherwise the edge does not exist, so this word is not recognized
      return false;
    }
  }
}


// EXAMPLE 1:
let myTrie = new Trie();
myTrie.insert("ten");
//         O        = root node
//      t / 
//       O            
//    e /  
//     O   
//  n /  
//   O              = terminal node


myTrie.insert("tea");
//         O        = root node
//      t / 
//       O            
//    e /  
//     O   
//  n / \ a
//   O   O          = terminal nodes


console.log(myTrie.search("ten"));       //=> true
console.log(myTrie.search("tea"));       //=> true
console.log(myTrie.search("te"));        //=> false
