## MERKLE TREE

### RESOURCES
- https://www.npmjs.com/package/merkletreejs
- https://medium.com/coinmonks/implementing-merkle-tree-and-patricia-trie-b8badd6d9591
- https://www.youtube.com/watch?v=2kPFSoknlUU
- https://www.youtube.com/watch?v=V6gLY-1G4Mc

### NOTES
- used in ethereum and bitcoin blockchains
- a tree data structure, where data is stored in the leaf nodes
- non leaf nodes store hashes of data with each non-leaf node being the combined hash value of the nodes below it
- not necessarily a binary tree

    **node = hash ∑ (node.children(i).hash)**

- Example. given a list of letters ("A", "B", "C", "D", "E") create a merkel tree from it
- The lowest layer of the tree would contain the data in each node
  A    B    C    D    E

- The layer above would contain its hash values. H(A) = pass A into Hash function, which gives you the hashed value of A
  <pre>
  H1=H(A)   H2=H(B)   H3=H(A)   H4=H(B)   H5=H(B)   // leaves
  |         |         |         |         |
  A         B         C         D         E         // data </pre>

- Usually we take two nodes from the second layer and combine them to form another node
- if we have even number of nodes, we take two consecutive nodes and form the parent layer
- if we have odd number of nodes, we take two consecutive nodes until one is left to formt the parent layer
  <pre>
                        R = H(H8 + H5)              // Merkle Root
                      /                \
                     /                  \
                    /                    \
            H8=H(H6 + H7)                 H5        // Nodes
            /         |                   |
           /          |                   |
          /           |                   |
      H6=H(H1 + H2)   H7=H(H3 + H4)       H5        // Nodes
      /     |         |         \         |
     /      |         |          \        |
    /       |         |           \       |
  H1=H(A)   H2=H(B)   H3=H(A)   H4=H(B)   H5=H(B)   // leaves
  |         |         |         |         |
  A         B         C         D         E         // data </pre>
  

### Verification
- the importance of merkel trees is in the ability to verify data efficiently
- given any data from the list, we can verify in O(h) time complexity that the data is valid
- [Merkle Proof]() 
  - "cheap" way to prove that a small piece of data is in a big data set
  - you wouldn't want to download the entire blockchain just to verify that a transaction is in the blockchain
  - given the merkle root, the transaction hash you want to verify, and only some transaction hashes, 
    we can verify that the transaction is valid!
  - Ex. say we want to verify transaction C
  <pre>
                        R = H(H8 + H5)                // Merkle Root
                      /                \
                     /                  \
                    /                    \
            H8=H(H6 + H7)                 H5        
            /         |                   |
           /          |                   |
          /           |                   |
      * H6=H(H1 + H2)   H7=H(H3 + H4)     H5     
      /     |         |         \         |
     /      |         |          \        |
    /       |         |           \       |
  H1=H(A)   H2=H(B)   H3=H(A)  * H4=H(B)  * H5=H(B)   // * = node/hash we need
  |         |         |         |         |
  A         B        `C         D         E           // ` = node/hash we want to verify </pre>

  - note above, if we want to verify the transaction C node, we only need
    - *H4, *H5, and *H6
    - we don't need the entire tree!
- so if someone were to tamper with a transaction, that change would be reflected in the transaction hash
  which would then cascade upward the tree for every other transaction hash, and finally the merkle root
  would be different and thus invalidating the block!
- the merkle root is what gets put into a block header
- [block header]()
  - contains: 
    - hash of last block
    - merkle root
    - other stuff
