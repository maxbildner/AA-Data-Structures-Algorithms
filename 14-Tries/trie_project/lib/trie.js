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


	// VERSION 3- AA SOLUTION- HARD TO READ, ONE MASSIVE FUNCTION
	// Returns array of all words that start with prefix
	// ('ten') 	=> ['ten']
	// ('t') 		=> ['ten', 'tea']
	// ('tend')	=> []
	// ('ta')		=> []
	// ('te') 	=> ['ten', 'tea']
	wordsWithPrefix(prefix, root=this.root) {																			// set default current node to root
		let allWords = [];
		
		if (prefix.length === 0) {																									// if prefix empty '', return all words in trie starting from given node
			if (root.isTerminal) allWords.push('');																		// base case, if current node is terminal, add empty string to array (incase we have words "in" AND "inn" we need to add aditional '')
			// 1: root = { children:{'t':Node}, isTerminal:false }
			// 2: root = { children:{'e':Node}, isTerminal:false }
			// 3: root = { children:{'n':Node, 'a':Node}, isTerminal:false }
			// 4: root = { children:{}, isTerminal:true },   	allWords = ['']
			// 5: root = { children:{}, isTerminal:true },   	allWords = ['']
			
			for (let letter in root.children) {																				// loop through current node's children
				// 1, 1: letter = 't'
				// 2, 1: letter = 'e'
				// 3, 1: letter = 'n'
				// 3, 2: letter = 'a'
	
				let child = root.children[letter];																			// grab child node at key letter
				// 1, 1: child = { children:{'e':Node}, isTerminal:false }
				// 2, 1: child = { children:{'n':Node, 'a':Node}, isTerminal:false }
				// 3, 1: child = { children:{}, isTerminal:true }
				// 3, 2: child = { children:{}, isTerminal:true }
				
				let suffixes = this.wordsWithPrefix(prefix, child); 										// recursively traverse through this child, and grab suffixes (ex. -'ing', 'ed')
				// 1, 1: suffixes = wordsWithPrefix(prefix, child)	=> ['en', 'ea']
				// 2, 1: suffixes = wordsWithPrefix(prefix, child)  => ['n', 'a']
				// 3, 1: suffixes = wordsWithPrefix(prefix, child)	=> ['']
				// 3, 2: suffixes = wordsWithPrefix(prefix, child)	=> ['']
				
				let words = suffixes.map(suffix => letter + suffix);										// add letter to begin of each suffix
				// 3, 1: words = ['n']
				// 3, 2: words = ['a']
				// 2, 1: words = ['en', 'ea']
				// 1, 1: words = ['ten', 'tea']
	
				allWords.push(...words);																								// add words to allWords array
				// 3, 1: allWords = ['n']
				// 3, 2: allWords = ['n', 'a']
				// 2, 1: allWords = ['en', 'ea']
				// 1, 1: allWords = ['ten', 'tea']
			}
			return allWords;

		} else {																																		// if prefix exists (i.e. length != 0)
			let firstLetter = prefix[0];																							// grab first letter of prefix
			let child = root.children[firstLetter];

			if (child === undefined) {																								// exit if no edge for letter
				return [];

			} else {																																	// if edge for letter exists
				let suffixes = this.wordsWithPrefix(prefix.slice(1), child);						// travel through edge of first letter
				let words = suffixes.map(suffix => firstLetter + suffix);
				return words;
			} 
		}
		
	}



	// VERY EASY TO UNDERSTAND. EASY TO READ CODE FOR HUMANS (helper function)
	// VERSION 2- get last node of prefix, then get all valid words from that node
	// wordsWithPrefix(prefix, root = this.root) {
	// 	let words = [];
	// 	for (let i = 0; i < prefix.length; i++) {																		// 1) grab node at end of prefix
	// 		var letter = prefix[i];
	// 		if (!(letter in root.children)) {																					// 2) exit if no edge for letter
	// 			return words;
	// 		}
	// 		root = root.children[letter];																		
	// 	}
	// 	let suffixes = this.allWordsInTrie(root);																		// 3) grab all valid words starting with end prefix node
	// 	words = suffixes.map(suffix => prefix + suffix);														// 4) prepend prefix to all suffixes
	// 	return words;
	// }



	// VERSION 1-  BRUTE FORCE get all words in trie, then filter them for prefix
	// wordsWithPrefix(prefix, root = this.root) {
	// 	let words = this.allWordsInTrie();																				// 1) get all words in trie
	// 	words = words.filter(word => {																						// 2) filter words for begin prefix
	// 		return word.slice(0, prefix.length) === prefix;
	// 	});
	// 	return words;
	// }


	// Returns array of all words in the trie
	// () 	=> ['ten', 'tea']
	allWordsInTrie(root=this.root) {																							// set default current node to root
		let allWords = [];

		if (root.isTerminal) allWords.push('');																			// base case, if current node is terminal, add empty string to array (incase we have words "in" AND "inn" we need to add aditional '')
		// 1: root = { children:{'t':Node}, isTerminal:false }
		// 2: root = { children:{'e':Node}, isTerminal:false }
		// 3: root = { children:{'n':Node, 'a':Node}, isTerminal:false }
		// 4: root = { children:{}, isTerminal:true },   	allWords = ['']
		// 5: root = { children:{}, isTerminal:true },   	allWords = ['']
		
		for (let letter in root.children) {																					// loop through current node's children
			// 1, 1: letter = 't'
			// 2, 1: letter = 'e'
			// 3, 1: letter = 'n'
			// 3, 2: letter = 'a'

			let child = root.children[letter];																				// grab child node at key letter
			// 1, 1: child = { children:{'e':Node}, isTerminal:false }
			// 2, 1: child = { children:{'n':Node, 'a':Node}, isTerminal:false }
			// 3, 1: child = { children:{}, isTerminal:true }
			// 3, 2: child = { children:{}, isTerminal:true }
			
			let suffixes = this.allWordsInTrie(child); 																// recursively traverse through this child, and grab suffixes (ex. -'ing', 'ed')
			// 1, 1: suffixes = allWordsInTrie(child)	=> ['en', 'ea']
			// 2, 1: suffixes = allWordsInTrie(child)  => ['n', 'a']
			// 3, 1: suffixes = allWordsInTrie(child)	=> ['']
			// 3, 2: suffixes = allWordsInTrie(child)	=> ['']
			
			let words = suffixes.map(suffix => letter + suffix);											// add letter to begin of each suffix
			// 3, 1: words = ['n']
			// 3, 2: words = ['a']
			// 2, 1: words = ['en', 'ea']
			// 1, 1: words = ['ten', 'tea']

			allWords.push(...words);																									// add words to allWords array
			// 3, 1: allWords = ['n']
			// 3, 2: allWords = ['n', 'a']
			// 2, 1: allWords = ['en', 'ea']
			// 1, 1: allWords = ['ten', 'tea']
		}

		return allWords;
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

// #INSERT ITERATIVELY
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

// #ALL WORDS IN TRIE;
// myTrie.insertRecur('ten');
// myTrie.insertRecur('tea');
// // myTrie.insertRecur('teat');
// // myTrie.insertRecur('tear');
// // console.log(myTrie.allWordsInTrie());			//=> ['ten', 'tea', 'teat', 'tear'];
// console.log(myTrie.allWordsInTrie());					//=> ['ten', 'tea'];

// #PREFIX
// myTrie.insertRecur('t');
myTrie.insertRecur('te');
myTrie.insertRecur('ten');
myTrie.insertRecur('tea');
myTrie.insertRecur('teat');
myTrie.insertRecur('tear');
console.log(myTrie.wordsWithPrefix('te'));					//=> ['te', 'ten', 'tea'];
// console.log(myTrie.wordsWithPrefix(''));					//=> ['ten', 'tea', 'teat', 'tear'];
// console.log(myTrie.wordsWithPrefix('t'));					//=> ['te', 'ten', 'tea'];
// console.log(myTrie.wordsWithPrefix('t'));					//=> ['te', 'ten', 'tea'];
// console.log(myTrie.wordsWithPrefix('ta'));					//=> ['te', 'ten', 'tea'];

// console.log(myTrie.wordsWithPrefix('te'));					//=> ['te', 'ten', 'tea'];
// console.log(myTrie.wordsWithPrefix('ta'));				//=> [];
// console.log(myTrie.wordsWithPrefix('tend'));			//=> [];
// console.log(myTrie.wordsWithPrefix('ten'));			//=> ['ten'];
// console.log(myTrie.wordsWithPrefix('tea'));			//=> ['tea', 'teat', 'tear'];



