// ============================================================================
// Interview Problem: Balanced Parentheses
// SIMILAR TO LEETCODE LC 20 Valid Parenthesis (EASY)
// ============================================================================
//
// -------
// Prompt:
// -------
//
// You are building a linter for your company's new custom text editor to keep
// the code smells out of your (anticipated) massive codebase! Part of your 
// technical design includes writing a function that checks that all of the 
// parentheses in your engineers' code are balanced.
//
// Given a string of text, write a function that returns true if the 
// parentheses are balanced, and false if they are not.
//
// Note: Your code should ignore all non-bracket characters in the input 
//       string.
//
// ------
// Bonus: 
// ------
//  
// Though you may want to start by writing a function that simply handles
// parentheses as an MVP, to build a truly impactful product you must handle 
// ALL bracket types, including:
//
//         - Parentheses:     ()
//         - Square Brackets: []
//         - Curly Brackets:  {}
//
// Update your original balancedParens function to handle all bracket types.
//
// ------------
// Constraints:
// ------------ 
//
// (1) Your function must run in linear time, O(n).
// (2) Your function must consume (at maximum) linear space, O(n).
//
// ---------------------------
// Example 1: Parentheses Only
// ---------------------------
//
// balancedParens('(');          => false
// balancedParens('()');         => true
// balancedParens(')(');         => false
// balancedParens(')()())');     => false
// balancedParens('((()()))');   => true
//
// -----------------------------
// Example 2: Parentheses + Text
// -----------------------------
//
// balancedParens('var x = Math.floor(2.5)');             => true
// balancedParens('var y = (((x + 5)/6) + 2*(x + 10))');  => true
// balancedParens('var z = ()(x + 5)/6) + 2*(x + 10))');  => false
//
// -----------------------
// Example 3: All Brackets
// -----------------------
//
// balancedParens('()[]{}');     => true
// balancedParens('[{()}]');     => true
// balancedParens('[{])({)[}');  => false
//
// ------------------------------
// Example 4: All Brackets + Text
// ------------------------------
//
// balancedParens('const roundDown = function(num) { return Math.floor(num) };');      => true
// balancedParens('{ array: [1, 2, [3, 4], 5], timesTwoMethod: (num) => num * 2; }');  => true 
// balancedParens('function printThirdElement(array) { console.log(array[3]]] }');     => false 
//
// -----------



// SOLUTION V1- MY SOLUTION- NO Stack, uses objects, 
// DOESNT WORK FOR ALL CASES    '((([[[{{{ ]]]}}})))'
// TIME COMPLEXITY:   O(N),   N = string length
// SPACE COMPLEXITY:  O(N)
// '[{()}]'    =>  true
// ')('        => false
// TIME
function balancedParensV1(str) {
  let validLeft = { 
    '(': { count: 0, opposite: ')' },
    '[': { count: 0, opposite: ']' },
    '{': { count: 0, opposite: '}' }
  };

  let validRight = { 
    ')': { count: 0, opposite: '(' },
    ']': { count: 0, opposite: '[' },
    '}': { count: 0, opposite: '{' }
  };

  for (let i = 0; i < str.length; i++) {                                        // loop through  string
    let char = str[i];
    
    if (validLeft[char] != undefined) {                                         // if char valid left bracket
      validLeft[char].count++;                                                  // increment left count (for that specific type of bracket)
    }

    if (validRight[char] != undefined) {                                        // if char valid right bracket
      let complement = validRight[char].opposite;
      if (validLeft[complement].count === 0) return false;                      // invalid if no lefts to counter right
      validLeft[complement].count--;                                            // decrease left bracket count by 1
    }
  }

  if (validLeft['('].count !== validRight[')'].count) return false;             // invalid if unblanced left/right
  if (validLeft['['].count !== validRight[']'].count) return false;
  if (validLeft['{'].count !== validRight['}'].count) return false;

  return true;
}

// console.log(balancedParens(')('));                    //=> false
// console.log(balancedParens('()'));                    //=> true
// console.log(balancedParens('(((((())))))'));          //=> true
// console.log(balancedParens('(((((((()'));             //=> false
// console.log(balancedParens('[{()}]'));                //=> true
// console.log(balancedParens('((([[[{{{ ]]]}}})))'));   //=> false   DOESNT WORK



/******************************************************************************/
// SOLUTION V2- AAA SOLUTION- Uses Stack ADT
// TIME COMPLEXITY:   O(N),   N = string length
// SPACE COMPLEXITY:  O(N),   bec. of stack array
// ')('     => false
// '{[]}'   => true      
// '{[}]'   => false
function balancedParens(str) {
  // Here is an example of using a "Poor Man's Stack" to 
  // manage limited-time interviews and get to the meat of the 
  // interview problem quickly. 
  //
  // We are relying on arrays and on the developer following the
  // honor system here. They must treat the array as if it is
  // Stack.
  //
  // NEVER do this in an interview setting without confirming
  // with the interviewer that they know you are purposefully
  // taking a shortcut to avoid boring them with your Stack
  // implementation. 
  //
  // You must look at your interviewer here, gauge their affect
  // and the tonality of their voice, and make sure they appreciate 
  // this as a gesture and that they will not dock points for 
  // skipping something they originally wanted to test you on.
  //
  // Pulling this off is almost entirely a matter of how confidently
  // you appear when you do it. If you exude so much confidence that
  // the interivewer feels that implementing a proper OOP Stack class 
  // from scratch is a waste of everyone's time in the room, 
  // than you win.

  let stack = [];                                                               // 1) create array lazy stack only holds valid LEFT brackets (push and pop methods only)

  const validPairs = {                                                          // 2) create hash table of valid bracket pairs (k/v = left parens/right parens)
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for (let i = 0; i < str.length; i++) {                                        // 3) loop through all chars in string
    let char = str[i];

    if (validPairs[char]) {                                                     // 4) if char is a valid LEFT bracket, push char to stack
      stack.push(char);                                                         

    } else if (char === ')' || char === ']' || char === '}') {                  // 5) else if char is valid RIGHT bracket

      if (validPairs[stack.pop()] !== char) return false;                       // 6) invalid if the last char in stack NOT equal to char
    }
  }

  return stack.length === 0;                                                    // 7) invalid if stack isn't empty (i.e. left/right brackets unbalanced)
}

// console.log(balancedParens(')('));                    //=> false
// console.log(balancedParens('(((((((()'));             //=> false
// console.log(balancedParens('((([[[{{{ ]]]}}})))'));   //=> false   
// console.log(balancedParens('()'));                    //=> true
// console.log(balancedParens('(((((())))))'));          //=> true
// console.log(balancedParens('[{()}]'));                //=> true


exports.balancedParens = balancedParens;
