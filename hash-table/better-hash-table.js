// Here we recreate a better version of a Hash Table (Hash Map) data structure 
// with O(1) average lookup time. 
// We use an ARRAY OF LINKED LISTS and a hash code function. 
// The map class will have the following methods & average case time compelxities:
//  set(key, value)    Insertion  O(1)   O(N) worst case?
//  get(key)           Access     O(1)
//  delete(key)        Deletion   O(1)
//  show

// First we create a Node and Linked list class that we'll use in our HashTable Class
// We use a linked list to avoid collisions!
// https://www.geeksforgeeks.org/implementation-linkedlist-javascript/
class Node {
  constructor(key, value) {
    this.key = key;     
    this.value = value;     
    this.next = null;       // pointer to next node
  }
}

class LinkedList {
  constructor() {
    this.head = null;       // points to first node in linkedList
    this.size = 0;
  }

  // adds key/value pair at the end of the list
  addValue(key, value) {
    let node = new Node(key, value);
    
    // to store current node
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      // loop to the end of the list
      while (current.next) {
        current = current.next;
      }

      // add node
      current.next = node;
    }
    return this.size++;
  }


  // changes the value, given the key and value
  changeValue(key, value) {
    let currentNode = this.head;

    // loop through nodes (excluding last one)
    while (currentNode.next != null) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return value;
      }
      currentNode = currentNode.next;
    }

    // check last one
    if (currentNode.key === key) {
      currentNode.value = value;
      return value;
    }

    // if we reach this, point we do not have a matching key in current linkedList
    currentNode.next = new Node(key, value);
    this.size++;
    return value;
  }


  // finds value, given key
  findValue(key) {
    let currentNode = this.head;
    // currentNode = Node {
    //      key: 'apples',
    //      value: 2,
    //      next: Node { key: 'pears', value: 4, next: null } },
  
    // loop through nodes (excluding last one)
    while (currentNode.next != null) {
      if (currentNode.key === key) {
        return currentNode.value;
      }    
      currentNode = currentNode.next;
    }

    // check last one
    if (currentNode.key === key) return currentNode.value;
  }
}



// Helper Hashing function (similar to Java's String.hashCode)
// Takes in string, returns number
// Ex. 'hi'   => 3329
// Ex. ''     => 0
// Source: https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
function hashCode(string) {
  let hash  = 0;
  let length = string.length;
  let i = 0;

  if (length > 0) {
    while (i < length) {
      hash = (hash << 5) - hash + string.charCodeAt(i++) | 0;
    }
  }
  return hash;
}



class HashTable {
  // gets called automatically when one creates a new instance of a Map class object
  constructor() {
    // create property (instance variable)
    this.underlyingArray = [];
  }

  // To Insert a key/value pair:
  // 1) compute hash code from the key
  // 2) compute the index from the hash code
  //    Here we use hash(key) % array length
  // 3) At this index there is a linked list of keys and values
  //    store the key and vlaue in this index
  // Ex. 'apples', 2
  set(key, value) {
    // 1) compute hash code from the key
    let hash = hashCode(String(key));

    let index, linkedList;
    // if hashTable is empty
    if (this.underlyingArray.length === 0) {
      index = 0;

      // make new linked list
      linkedList = new LinkedList();

      // add linkedList to underlyingArray
      this.underlyingArray[index] = linkedList;

      linkedList.addValue(key, value);
    } else {    // hashTable NOT empty
      // 2) compute the index from the hash code hashCode(key) % array length
      index = hash % this.underlyingArray.length;

      // grab the linked list
      linkedList = this.underlyingArray[index];

      // sets key value pair to end of linked list
      linkedList.changeValue(key, value);
    }
    
    return value;
  }


  // To retrieve the value, given a key:
  get(key) {
    // 1) compute hash code from the key
    let hash = hashCode(String(key));

    let index;
    // if hashTable is empty
    if (this.underlyingArray.length === 0) {
      return undefined;
    } else {
      // 2) compute the index from the hash code hashCode(key) % array length
      index = hash % this.underlyingArray.length;
    }

    // 3) search through the linked list for the value with this key
    let linkedList = this.underlyingArray[index];
    return linkedList.findValue(key);
  }
}




let pantry = new HashTable();
console.log(pantry.set('apples', 2));     //=> 2
// console.log(pantry.underlyingArray);      
// => 
// [ 
  //   LinkedList { 
    //     head: Node { key: 'apples', value: 2, next: null },
    //     size: 1
    //   } 
    // ]
console.log(pantry.get('apples'));          //=> 2
console.log(pantry.set('pears', 5));        //=> 5
console.log(pantry.underlyingArray);        //=> [ LinkedList { head: Node { key: 'apples', value: 2, next: Node }, size: 2 } ]
console.log(pantry.get('pears'));           //=> 5
console.log(pantry.set('pears', 20));       //=> 20
console.log(pantry.get('pears'));           //=> 20