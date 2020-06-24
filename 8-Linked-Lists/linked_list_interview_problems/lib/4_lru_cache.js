// ============================================================================
// Interview Problem: Design and Implement an LRU Cache
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Given the implementation of a Doubly Linked List, design and implement 
// an LRU, or Least Recently Used, cache.
//
// ------------
// Explanation:
// ------------
//
// An LRU Cache is a data structure valued for its constant time read and write
// operations. Its methods, get(key) and set(key, val), are both O(1), just
// like a Hash Table.
//
// However, unlike a Hash Table, instead of re-sizing once it reaches its
// maximum capacity for stored items, it instead removes the least recently
// used item from the cache, also in O(1) time.
//
// NOTE: We determine the item that is "Least Recently Used" by its most-recent
// "get" time, not just by its creation time!
//
// NOTE:
// WHEN AN ITEM IS PROMOTED BECAUSE IT WAS USED/GET, IT IS PROMOTED TO FRONT!!!
// --------
// Example:
// --------
//
// const lruCache = new LRUCache(4);   => limit of 4 items
// lruCache.set('a', 'A');
// lruCache.set('b', 'B');
// lruCache.set('c', 'C');
// lruCache.set('d', 'D');
// lruCache.set('e', 'E');                          // A is deleted since there hasnt been any usage, so insertion/creation time
//
// lruCache.get('c')                   => 'C'       
// lruCache.get('b')                   => 'B'
//
// Item 'a' was removed because it was the oldest item by insertion/usage
//
// lruCache.get('a')                   => null
//
// Next, item 'e' is removed to make room, because it is the oldest by usage,
// which takes priority.                            // ? WHY not D?! neither have been used, so D has older insertion/creation time wtf
//
// lruCache.set('f', 'F');
//
// Item 'd' is also removed, because it was retrieved before item 'b' was
// last retrieved.
//
// lruCache.set('g', G);
//
// -----------



// TODO: Implement the LRUCacheItem class here
class LRUCacheItem {
  constructor(val = null, key = null) {
    this.key = key;
    this.val = val;
    this.node = null;           //
  }
}



// TODO: Implement the LRUCacheItem class here
class LRUCache {
  constructor(limit) {
    this.items = {};                                                            // Hash Table of LRUCacheItem objects as values
    this.ordering = new List();                                                 // doubly linked List to keep track of ordering!
    this.limit = limit;                                                         // maximum num of items LRUCache can hold
    this.length = 0;                                                            // tracks num of LRUCacheItems in LRUCache
  }


  // Returns length property (num items in linked list)
  size() {
    return this.length;
  }


  // returns value of an item in LRUCache that corresponds to key provided
  // returns null if not found
  get(key) {
    // if (this.items[key] !== undefined) {                                        // if item already exists in LRUCache, return LRUCacheItem's value
    //   this.promote(this.items[key]);                                            // promote LRUCacheItem to front of list
    //   return this.items[key].val;
    // } else {
    //   return null;
    // }
    if (!this.items[key]) return null;

    const item = this.items[key];
    this.promote(item);

    return item.val;
  }


  // returns updated LRUCache
  // creates a new LRUCacheItem (node) and adds it to the LRU Cache if one doesn't already exist with key provided
  set(key, val) {
    // let item;                                                           // item == LRUCacheItem object

    // if (this.items[key] !== undefined) {                                // if item already exists, set/update val  
    //   item = this.items[key]                                            // memoize item object in LRUCache items property
    //   item.val = val;                                                   // update the value of the item
    //   this.promote(item);                                               // promote item to front of list

    // } else {                                                            // item doesn't exist, set new item
    //   if (this.isFull()) this.prune();                                  // if LRUCache is full, prune the cache
    //   item = new LRUCacheItem(val, key);                                // create new LRUCacheItem object
    //   this.items[key] = item;                                           // update this.items property in LRUCache @ key w/ value of new item
    //   this.length++;                                                    // increment LRUCache length property
    //   // item.node = this.ordering.unshift(item);                       // set item's node property to head ListNode, also insert item at head of the list
    //   this.ordering.unshift(item);                                      // below 2 lines equal to above 1 line. ListNode is created in .unshift
    //   item.node = this.ordering.head;
    // }

    // return this;

    let item;
    // Set an existing item
    if (this.items[key]) {
      item = this.items[key];
      item.val = val;
      this.promote(item);

      // Set a new item
    } else {
      // Make space if necessary
      if (this.isFull()) this.prune();

      item = new LRUCacheItem(val, key);
      item.node = this.ordering.unshift(item);
      this.items[key] = item;
      this.length += 1;
    }
  }


  // returns boolean, true if LRUCache length property is full (limit)
  isFull() {
    return this.length >= this.limit;
  }


  // returns undefined
  // deletes oldest ListNode and corresponding LRUCacheItem 
  prune() {
   const oldest = this.ordering.pop();                                          // delete oldest ListNode from ordering List, store in var 
   delete this.items[oldest.key];                                               // delete LRUCacheItem from this.items property in LRUCache
   this.length = Math.max(0, this.length - 1);                                  // update length property (but don't go negative)
  }


  // returns undefined
  // given LRUCacheItem, moves corresponding ListNode to front of List
  promote(item) {
    this.ordering.moveToFront(item.node);
  }
}




// ----------------------------------------
// Given: Doubly Linked List - Do Not Edit!
// ----------------------------------------
class ListNode {
  constructor(val, prev = null, next = null) {
    this.prev = prev;
    this.val = val;
    this.next = next;
  }

  delete() {
    if (this.prev) this.prev.next = this.next;
    if (this.next) this.next.prev = this.prev;
  }
}


class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Insert at the head of the list. Returns Head Node
  // !!!! takes in LRUCacheItem. val === LRUCacheItem
  unshift(val) {
    if (this.head === null && this.tail === null) {                             // if List is empty
      this.head = new ListNode(val);                                            // set tail & head to same new ListNode
      this.tail = this.head;
    } else {
      this.head = new ListNode(val, null, this.head);
      this.head.next.prev = this.head;
    }

    return this.head;
  }

  // Delete at the head of the list.
  shift() {
    if (this.head === null && this.tail === null) {
      return null;
    } else {
      let head = this.head;
      this.head = this.head.next;
      head.delete();
      return head.val;
    }
  }

  // Insert at the end of the list.
  push(val) {
    if (this.head === null && this.tail === null) {
      this.head = this.tail = new ListNode(val);
    } else {
      this.tail = new ListNode(val, this.tail, null);
      this.tail.prev.next = this.tail;
    }

    return this.tail;
  }

  // Delete at the end of the list.
  pop() {
    if (this.head === null && this.tail === null) {
      return null;
    } else {
      let tail = this.tail;
      this.tail = this.tail.prev;
      tail.delete();
      return tail.val;
    }
  }

  // Move a node to the front of the List
  moveToFront(node) {
    if (node === this.tail) {
      this.pop();
    } else if (node === this.head) {
      return;
    } else {
      node.delete();
    }

    node.prev = node.next = null;

    // Don't delegate to shift, since we want to keep the same
    // object.

    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  // Move a node to the end of the List
  moveToEnd(node) {
    if (node === this.head) {
      this.shift();
    } else if (node === this.tail) {
      return;
    } else {
      node.delete();
    }

    // Don't delegate to push, since we want to keep the same
    // object.

    node.prev = null;
    node.next = null;

    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }
}



exports.List = List;
exports.ListNode = ListNode;
exports.LRUCache = LRUCache;
exports.LRUCacheItem = LRUCacheItem;




// MY OWN EXAMPLES:
// EXAMPLE 1:
let fancyLRUCache = new LRUCache(4);
// console.log(fancyLRUCache);              
//=> { items: {},                                                       
//     ordering: LIST{head:null,  tail:null},              
//     limit: 4,  
//     length: 0 
//   }

// 1) 
console.log(fancyLRUCache.set('a', 'A'));   
console.log(" ");
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'A ->'
//=> { 
//   items: {
//    'a': LRUCACHE_ITEM{ key:'a',    val:'A',   node:LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null},    
//      tail: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 1 
// }


// 2) 
console.log(" ");
console.log(fancyLRUCache.set('b', 'B'));   
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'B -> A ->'
//=> { 
//   items: {
//    'a': LRUCACHE_ITEM{ key:'a',    val:'A',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//    'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 2
// }


// 3) 
console.log(" ");
console.log(fancyLRUCache.set('c', 'C'));   
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'C -> B -> A ->'
//=> { 
//   items: {
//    'a': LRUCACHE_ITEM{ key:'a',    val:'A',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//    'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//    'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 3
// }


// 4) 
console.log(" ");
console.log(fancyLRUCache.set('d', 'D'));   
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'D -> C -> B -> A ->'
//=> { 
//   items: {
//    'a': LRUCACHE_ITEM{ key:'a',    val:'A',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//    'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//    'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//    'd': LRUCACHE_ITEM{ key:'d',    val:'D',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 4
// }


// 5) 
console.log(" ");
console.log(fancyLRUCache.set('e', 'E'));   
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'E -> D -> C -> B ->'
//=> { 
//   items: {
//      'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'd': LRUCACHE_ITEM{ key:'d',    val:'D',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'e': LRUCACHE_ITEM{ key:'e',    val:'E',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 4
// }


// 6) 
console.log(" ");
console.log(fancyLRUCache.get('c'));   
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'C -> E -> D -> B ->'
//=> { 
//   items: {
//      'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'd': LRUCACHE_ITEM{ key:'d',    val:'D',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'e': LRUCACHE_ITEM{ key:'e',    val:'E',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 4
// }


// 7) 
console.log(" ");
console.log(fancyLRUCache.get('b'));   
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'B -> C -> E -> D ->'
//=> { 
//   items: {
//      'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'd': LRUCACHE_ITEM{ key:'d',    val:'D',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'e': LRUCACHE_ITEM{ key:'e',    val:'E',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 4
// }



// 8) 
console.log(" ");
console.log(fancyLRUCache.get('a'));                    //=> null
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'B -> C -> E -> D ->'
//=> { 
//   items: {
//      'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'd': LRUCACHE_ITEM{ key:'d',    val:'D',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'e': LRUCACHE_ITEM{ key:'e',    val:'E',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 4
// }


// 9) 
console.log(" ");
console.log(fancyLRUCache.set('f'));                    
console.log(" "); 
console.log(stringify(fancyLRUCache.ordering.head));    //=> 'F -> B -> C -> E ->'
//=> { 
//   items: {
//      'b': LRUCACHE_ITEM{ key:'b',    val:'B',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'c': LRUCACHE_ITEM{ key:'c',    val:'C',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'd': LRUCACHE_ITEM{ key:'d',    val:'D',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} },
//      'e': LRUCACHE_ITEM{ key:'e',    val:'E',   node: LIST_NODE{prev:null, val:[LRUCACHE_ITEM], next:null} }
//    },  
//   ordering: LIST{ 
//      head: LIST_NODE{prev:null,       val:[LRUCACHE_ITEM], next:[ListNode]},    
//      tail: LIST_NODE{prev:[ListNode], val:[LRUCACHE_ITEM], next:null} 
//    },
//   limit: 4,  
//   length: 4
// }


// HELPER FUNCTION
// (LIST_NODE) => "A -> B ->"
function stringify(headListNode) {
  let currentNode = headListNode;
  let stringOrder = '';

  while (currentNode) {
    stringOrder += currentNode.val.val + ' -> ';
    currentNode = currentNode.next;
  }

  return stringOrder;
}