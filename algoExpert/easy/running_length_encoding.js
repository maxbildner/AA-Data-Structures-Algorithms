// ALGO EXPERT Running Length Encoding
// EASY
// https://www.algoexpert.io/questions/Run-Length%20Encoding
//
// Write a function that takes in a non - empty string and returns its 
// run-length encoding.
// From Wikipedia, "run-length encoding is a form of lossless data compression 
// in which runs of data are stored as a single data value and count, rather 
// than as the original run." For this problem, a run of data is any sequence of
// consecutive, identical characters. So the run "AAA" woulid be run-length 
// encoded as "3A"
// To make things more complicated, however, the input string can contain all
// sorts of special characters, including numbers.And since encoded data must be
// decodable, this means that we can't naively run-length-encode long runs. For
// example, the run ""AAAAAAAAAAAA"" (12As), can't naively be encoded as 
// "12A", since this string can be decoded as either "AAAAAAAAAAAA" or "1AA". 
// Thus, long runs (runs of 10 or more characters) should be encoded in a split 
// fashion; the aforementioned run should be encoded as "9A3A"

// INPUT:  string
// OUTPUT: string
// 
// EXAMPLE 1:
// "aaaaaaaaaaabbcc"        => "9a2a2b2c"

// EXAMPLE 2:
// "AAAAAAAAAAAAABBCCCCDD"" => "9A4A2B4C2D"



// TIME: 11:04
// *****************************************************************************
// VERSION 1- TOO MESSY- Loop through string, 2 if statements
// TIME COMPLEXITY:  O(N),    N = number of chars in string
// SPACE COMPLEXITY: O(N)     

// "aaaaaaaaaaabbcc" => "9a2b2c"
function runningLengthEncodingV1(str) {
  
  // create array to contain compressed string
  let compressed = [];

  // create var to track current count of each char when we loop below
  let count = 1;

  // loop through chars in string
  for (let i = 0; i < str.length; i++) {

    // grab current and next chars
    let curr = str[i];
    let next = str[i + 1];

    // if current == next
    if (curr === next){
      
      // if count hits 9, add count + char to array, reset count to 0
      if (count === 9) {
        compressed.push(count + curr);
        count = 0;
      }
      
      // increment count by 1
      count++;

      // else current != next
    } else {

      // add count + char to array, reset count to 1
      compressed.push(count + curr);
      count = 1;
    }
  }

  return compressed.join("");
}


// // EXAMPLE 1:
// console.log(runningLengthEncodingV1("aaaaaaaaaaabbcc"));                                //=> "9a2a2b2c"
// console.log(runningLengthEncodingV1("aaaaaaaaaaabbcc") == "9a2a2b2c");                    
// // EXAMPLE 2:
// console.log(runningLengthEncodingV1("AAAAAAAAAAAAABBCCCCDD"));                          //=> "9A4A2B4C2D"
// console.log(runningLengthEncodingV1("AAAAAAAAAAAAABBCCCCDD") == "9A4A2B4C2D");         
// // EXAMPLE 3:
// console.log(runningLengthEncodingV1("........______=========AAAA   AAABBBB   BBB"));    //=> "8.6_9=4A3 3A4B3 3B"
// console.log(runningLengthEncodingV1("........______=========AAAA   AAABBBB   BBB") == "8.6_9=4A3 3A4B3 3B"); 





// *****************************************************************************
// VERSION 2- CLEANER- Loop through string, 1 if statement
//    create var to track each run length
//    use array to store compressed, since concatenating strings increases run time
//    loop through string, update count (length)
//    1 if statement if we hit a count of 9 or current != next
// TIME COMPLEXITY:  O(N),    N = number of chars in string
// SPACE COMPLEXITY: O(N)     

// "aaaaaaaaaaabbcc" => "9a2b2c"
function runningLengthEncodingV2(str) {

  let counter = 0;                                                              // intialize counter to 0, and array (to return compressed string)
  let encodedString = [];                                                       

  for (let i = 0; i < str.length; i++) {                                        // loop through each char in string
    const char = str[i];                                                        // grab current and next char
    const nextChar = str[i + 1];
    counter++;                                                                  // increment counter by 1

    if ((counter === 9) || (char !== nextChar)) {                               // if we hit count of 9 or current != next
      encodedString.push(counter, char);                                        // update compressed array, update counter
      counter = 0;
    }
  }

  return encodedString.join("");
}


// EXAMPLE 1:
console.log(runningLengthEncodingV2("aaaaaaaaaaabbcc"));                                //=> "9a2a2b2c"
console.log(runningLengthEncodingV2("aaaaaaaaaaabbcc") == "9a2a2b2c");
// EXAMPLE 2:
console.log(runningLengthEncodingV2("AAAAAAAAAAAAABBCCCCDD"));                          //=> "9A4A2B4C2D"
console.log(runningLengthEncodingV2("AAAAAAAAAAAAABBCCCCDD") == "9A4A2B4C2D");
// EXAMPLE 3:
console.log(runningLengthEncodingV2("........______=========AAAA   AAABBBB   BBB"));    //=> "8.6_9=4A3 3A4B3 3B"
console.log(runningLengthEncodingV2("........______=========AAAA   AAABBBB   BBB") == "8.6_9=4A3 3A4B3 3B"); 
