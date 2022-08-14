## MERKLE TREE

## RESOURCES
- https://www.npmjs.com/package/merkletreejs
- https://medium.com/coinmonks/implementing-merkle-tree-and-patricia-trie-b8badd6d9591

## NOTES
- used in ethereum and bitcoin blockchains
- a tree data structure, where data is stored in the leaf nodes
- non leaf nodes store hashes of data with each non-leaf node being the combined hash value of the nodes below it
- not necessarily a binary tree

node = hash ∑ (node.children(i).hash)

- Example. given a list of letters ("A", "B", "C", "D", "E") create a merkel tree from it
- The lowest layer of the tree would contain the data in each node
  A    B    C    D    E

- The layer above would contain its hash values. H(A) = pass A into Hash function, which gives you the hashed value of A
  H1=H(A)   H2=H(B)   H3=H(A)   H4=H(B)   H5=H(B)   // leaves
  ^         ^         ^         ^         ^
  |         |         |         |         |
  A         B         C         D         E         // data 

- Usually we take two nodes from the second layer and combine them to form another node
- if we have even number of nodes, we take two consecutive nodes and form the parent layer
- if we have odd number of nodes, we take two consecutive nodes until one is left to formt the parent layer

                        R = H(H8 + H5)              // Root
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
  ^         ^         ^         ^         ^
  |         |         |         |         |
  A         B         C         D         E         // data 

## Verification
- the importance of merkel trees is in the ability to verify data efficiently
- given any data from the list, we can verify in O(h) time complexity that the data is valid

