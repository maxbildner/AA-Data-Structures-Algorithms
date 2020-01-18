// Here we recreate a dumb/slow Hash Table (Hash Map) data structure
// We will write a Map class that implements a map using only arrays.
// A map might look like: my_map = [[k1, v1], [k2, v2], [k3, v2], ...]
// The map stores info in key-value pairs, where keys are always unique
// The map class will have the following methods & worse case time compelxities:
//  set(key, value)     Insertion  O(N)
//  get(key)            Access     O(N)
//  delete(key)         Deletion   O(N) ?


class Map {
  // gets called automatically when one creates a new instance of a Map class object
  constructor() {
    // create property (instance variable)
    this.underlyingArray = [];
  }

  // Setter method
  set(key, value) {
    let pairIdx;
    // loop through each array in underlyingArray
    // return index in underlyingArray, where key in underlyingArray matches input key
    for (let i = 0; i < this.underlyingArray.length; i++) {
      let pair = this.underlyingArray[i];
      if (pair[0] === key) pairIdx = i;
    }
    
    // if pairIdx not undefined (i.e. underlyingArray is not empty)
    if (pairIdx) {
      // change value
      this.underlyingArray[pairIdx][1] = value;
    } else {
      this.underlyingArray.push([key, value]);
    }
    return value;
  }

  // Getter method
  get(key) {
    // loop through each array pair in underlyingArray
    // if key in array pair matches input key, return corresponding value
    for (let i = 0; i < this.underlyingArray.length; i++) {
      let pair = this.underlyingArray[i];
      if (pair[0] === key) return pair[1];
    }
  }

  delete(key) {
    let value = this.get(key);
    for (let i = 0; i < this.underlyingArray.length; i++) {
      let pair = this.underlyingArray[i];
      // splice is O(N) Time
      if (pair[0] === key) this.underlyingArray.splice(i, 1);
    }
    return value;
  }
}


let pantry = new Map();
console.log(pantry.set('apples', 2));     //=> 2
console.log(pantry.underlyingArray);      //=> [ [ 'apples', 2 ] ]
console.log(pantry.get('apples'));        //=> 2
console.log(pantry.delete('apples'));     //=> 2
console.log(pantry.underlyingArray);      //=> []






