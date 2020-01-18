// Here we recreate a better version of a Hash Table (Hash Map) data structure 
// with O(1) look up time. We will write a Map class that implements a map using 
// only arrays.
// A map might look like: my_map = [[k1, v1], [k2, v2], [k3, v2], ...]
// The map stores info in key-value pairs, where keys are always unique
// The map class will have the following methods & worse case time compelxities:
//  set(key, value)     Insertion  O(N)
//  get(key)            Access     O(N)
//  delete(key)         Deletion   O(N)
//  show

// We use an array of linked lists and a hash code function. 

// To retrieve the value pair:
// 1) compute hash code from the key
// 2) compute the index from the hash code
// 3) search through the linked list for the value with this key