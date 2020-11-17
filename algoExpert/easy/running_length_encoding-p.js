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




// *****************************************************************************
// VERSION 1- TOO MESSY- Loop through string, 2 if statements
// TIME COMPLEXITY:  O(N),    N = number of chars in string
// SPACE COMPLEXITY: O(N)     

// "aaaaaaaaaaabbcc" => "9a2b2c"
function runningLengthEncodingV1(str) {

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
// 
// TIME COMPLEXITY:  O(N),    N = number of chars in string
// SPACE COMPLEXITY: O(N)     

// "aaaaaaaaaaabbcc" => "9a2b2c"
function runningLengthEncodingV2(str) {

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
