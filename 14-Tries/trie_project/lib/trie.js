class Node {
	constructor() {
		this.children = {};							  																					// keys = edges (values),		values = nodes
		this.isTerminal = false;
	}
}


class Trie {
	constructor() {
		this.root = new Node();
	}


	// INSERT RECURSIVE
	// TIME: 	O(N), N = word length
	// SPACE: O(N)	due to recursive call stack/string slicing
	insertRecur(word, root=this.root) {
		let char = word[0];																													// grab first letter of word

		if (!(char in root.children)) {																							// if char is NOT an existing child edge
			root.children[char] = new Node();																					// add char as an edge of this root
		} 

		if (word.length === 1) {																										// if there are no other characters in the word, then mark the destination node as terminal
			root.children[char].isTerminal = true;
	
		} else {																																		// otherwise we have remaining characters so recursively insert them into the destination node
			this.insertRecur(word.slice(1), root.children[char]);
		}
	}


	// INSERT ITERATIVELY
	// TIME: 	O(N), N = word length
	// SPACE: O(1)
	insertIter(word) {
		let node = this.root;																												// initialize current node as root

		for (let i = 0; i < word.length; i++) { 																		// loop through all letters in word
			let char = word[i];

			if (!(char in node.children)) {																						// if letter is NOT an edge in current node, make it one
				node.children[char] = new Node();								
			}
			node = node.children[char];																								// update node
		}

		node.isTerminal = true;																											// make last node terminal
	}


	// SEARCH RECURSIVELY
	// TIME: 	O(N), N = word length
	// SPACE: O(N)	due to recursive call stack/string slicing
	searchRecur(word, root=this.root) {
		if (word.length === 0) {																										// finished looping through chars in word (due to continuously slicing word until it disappears)
			if (root.isTerminal) {																										// word is recognized if it is empty and the current node is terminal
				return true;

			} else {																																	// word is not recognized if it is empty and the current node is nonterminal
				return false;																														//   prefix is in trie, but not word. Ex. 'ten' is in trie, but word = 'te'
			}
		}

		let char = word[0];																													// take the first letter of the word

		if (char in root.children) {																								// if there is an edge for this letter
			return this.searchRecur(word.slice(1), root.children[char]);							// then recursively check the subtree rooted at the edge's destination with the remaining characters

		} else {
			return false;																															// otherwise the edge does not exist, so this word is not recognized
		}
	}


	// SEARCH ITERATIVELY
	// TIME: 	O(N), N = word length
	// SPACE: O(1)
	searchIter(word) {
		let node = this.root;																												// initialize node as current root

		for (let i = 0; i < word.length; i++) {																			// loop through all chars in word
			let char = word[i];	
			if (!(char in node.children)) return false;																// if letter is NOT an edge of current node (i.e. a key in node's children)
			node = node.children[char];																								// update node
		}

		return node.isTerminal;																											// node should be terminal after loop
	}


	// Returns array of all words that start with prefix
	// ('ten') 	=> ['ten']
	// ('t') 		=> ['ten', 'tea']
	// ('tend')	=> []
	// ('ta')		=> []

	// ('te') 	=> ['ten', 'tea']
	wordsWithPrefix(prefix, root=this.root) {
		// 1: prefix = 'te',	root = { children:{'t':Node}, isTerminal: false }
		// 2: prefix = 'e', 	root = { children:{'e':Node}, isTerminal: false }
		// 3: prefix = '', 		root = { children:{'n':Node, 'a':Node}, isTerminal: false }
		// 4: prefix = '', 		root = { children:{}, isTerminal: true }
		// 5: prefix = '', 		root = { children:{'t':Node, 'r':Node}, isTerminal: true }

		if (prefix.length === 0) {
			// 1: 'te'.length === 0		false
			// 2: 'e'.length === 0		false
			// 3: ''.length === 0		 	true
			// 4: ''.length === 0		 	true
			// 5: ''.length === 0		 	true

			let allWords = [];
			if (root.isTerminal) allWords.push('');
			// 4: allWords = ['']
			// 5: allWords = ['']

			for (let letter in root.children) {
				// 3, 1: letter = 'n'
				// 3, 2: letter = 'a'
				// 5, 1: letter = 't'

				let child = root.children[letter];
				// 3, 1: child = { children:{}, isTerminal: true }
				// 3, 2: child = { children:{'t':Node, 'r':Node}, isTerminal: true }
				// 5, 1: child = { children:{}, isTerminal: true }

				let suffixes = this.wordsWithPrefix('', child);
				// 3, 1: suffixes = wordsWithPrefix('', { children:{}, isTerminal: true }) = ['']
				// 3, 2: suffixes = wordsWithPrefix('', { children:{'t':Node, 'r':Node}, isTerminal: true }) = ['']
				// 5, 1: suffixes = wordsWithPrefix('', { children:{}, isTerminal: true }) = ['']

				let words = suffixes.map(word => letter + word);
				// 4: words = ['n']
				// 5: words = ['5']
				// console.log(words)

				allWords.push(...words);
			}

			return allWords;
			// 4: ['']

		} else {
			let firstLetter = prefix[0];
			// 1: firstLetter = 't'
			// 2: firstLetter = 'e'
			let child = root.children[firstLetter];
			// 1: child = { children:{'e':Node}, isTerminal: false }
			// 2: child = { children:{'n':Node, 'a':Node}, isTerminal: false }
			// console.log(child);
			
			if (child === undefined) {
				return [];

			} else {
				let suffixes = this.wordsWithPrefix(prefix.slice(1), child);
				// 1: suffixes = wordsWithPrefix('e', { children:{'e':Node}, isTerminal: false })
				// 2: suffixes = wordsWithPrefix('', { children:{'n':Node, 'a':Node}, isTerminal: false })

				return suffixes.map(suffix => firstLetter + suffix);
			}
		}
	}


	print(root=this.root) {
		if (root.isTerminal) return;

		for (let key in root.children) {
			console.log(key);
			this.print(root.children[key]);
		}
	}
}


module.exports = {
	Node,
	Trie
};


let myTrie = new Trie();
// myTrie.insertRecur('ten');
// myTrie.insertRecur('tea');
// myTrie.insertRecur('in');
// myTrie.insertRecur('inn');
//         O        = root node
//      t / 
//       O            
//    e /  
//     O   
//  n /  
//   O              = terminal node
// myTrie.print();

// INSERT ITERATIVELY
// myTrie.insertIter('ten');
// myTrie.insertIter('tea');
// myTrie.insertIter('in');
// myTrie.insertIter('inn');

// #SEARCH RECURSIVELY
// console.log(myTrie.searchRecur('ten'));					//=> true
// console.log(myTrie.searchRecur('tea'));					//=> true
// console.log(myTrie.searchRecur('in'));						//=> true
// console.log(myTrie.searchRecur('inn'));					//=> true
// console.log(myTrie.searchRecur('te'));						//=> false
// console.log(myTrie.searchRecur('tend'));					//=> false

// #SEARCH ITERATIVELY
// console.log(myTrie.searchIter('ten'));						//=> true
// console.log(myTrie.searchIter('tea'));						//=> true
// console.log(myTrie.searchIter('in'));						//=> true
// console.log(myTrie.searchIter('inn'));						//=> true
// console.log(myTrie.searchIter('te'));						//=> false
// console.log(myTrie.searchIter('tend'));					//=> false

// #PREFIX
myTrie.insertRecur('ten');
myTrie.insertRecur('tea');
myTrie.insertRecur('teat');
myTrie.insertRecur('tear');
// console.log(myTrie.wordsWithPrefix('ta'));			//=> [];
console.log(myTrie.wordsWithPrefix('te'));			//=> ['ten', 'tea', 'teat', 'tear'];


// console.log(wordsWithPrefix(''));					//=> ['ten', 'tea'];
// console.log(wordsWithPrefix('t'));				//=> ['ten', 'tea'];
// console.log(wordsWithPrefix('ten'));			//=> ['ten'];
// console.log(wordsWithPrefix('tend'));			//=> [];




