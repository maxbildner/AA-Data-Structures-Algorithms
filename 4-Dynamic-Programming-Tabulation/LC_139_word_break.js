// LC 139 Word Break
// https://leetcode.com/problems/word-break/
// MEDIUM
// Given a non - empty string s and a dictionary wordDict containing a list of 
// non - empty words, determine if s can be segmented into a space - separated 
// sequence of one or more dictionary words.
// The same word in the dictionary may be reused multiple times in the 
// segmentation. You may assume the dictionary does not contain duplicate words.
// Example 1:
// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".
//
// Example 2:
// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
// Note that you are allowed to reuse a dictionary word.
//
// Example 3:
// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false

// SOLUTION1- TABULATION
// ('applepen', ['app', 'apple', 'pen'])  => true
// a p p l e p e n
// 0 1 2 3 4 5 6 7
function wordBreak(string, dictionary) {
  // Create table length of string(8) + 1 = 9
  // [   ,  ,  ,  ,  ,  ,  ,  ,  ]
  //   0  1  2  3  4  5  6  7  8
  let table = new Array(string.length + 1).fill(false);

  // Since we're returning a boolean, we'll populate table with booleans
  // a boolean at position i = 3 would mean refer to 'app' 
  // (inclusive start i, exclusive end i)
  // [ 0, 1, 2, true, ... ]
  
  // Initialize first subproblem values in table
  // 0th value will always be true in this case because it refers to empty str
  table[0] = true;

  // Nested loop because we need to check all contiguous substrings
  // Loop through table
  for (let i = 0; i < table.length; i++) {
    // If current value we're looping through is false, skip/move to next iteration
    if (table[i] === false) continue;

    // Loop through rest of table
    for (let j = i + 1; j < table.length; j++) {
      // Check if the substring from 0 (inclusive) to i (exclusive) is in dictionary
      let substring = string.slice(i, j);
      // i = 0, j = 1: substring = 'a'
      // i = 0, j = 2: substring = 'ap'

      if (dictionary.includes(substring)) {
        table[j] = true;
        // i = 0, j = 1: table = [ true, false,  ,  ,  ,  ,  ,  ,  ]
        // i = 0, j = 1: table = [ true, false, false,  ,  ,  ,  ,  ,  ]
        // i = 0, j = 8: table = [ true, false, false, true, false, true, false, false, false ]
      }
    }
    // console.log(table);
    // i = 5, j = 8: table = [ true, false, false, true, false, true, false, false, true ]
  }

  // return last value in table
  return table[table.length - 1];
}


console.log(wordBreak('applepen', ['app', 'apple', 'pen']));
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));