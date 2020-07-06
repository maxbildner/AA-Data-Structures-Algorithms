class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}


class BST {
	constructor() {
		this.root = null;
	}


	insert(val, root=this.root) {
		if (!this.root) {                                                           // if tree is empty, make a new node and have it be the root
			this.root = new TreeNode(val);
			return;
		}

		// tree is not empty
		if (val < root.val) {                                                       // if val < root val
			if (!root.left) {                                                         //    and left child does NOT exist, make a node as roots left child
				root.left = new TreeNode(val);
			} else {                                                                  //    left child DOES exist, recursively insert on left child node
				this.insert(val, root.left);
			}

		} else {                                                                    // if val >= root val
			if (!root.right) {                                                        //    and right child does NOT exist, make a node as roots right child
				root.right = new TreeNode(val);
			} else {                                                                  //    left child DOES exist, recursively insert on right child node
				this.insert(val, root.right);
			}
		}
	}


	searchRecur(val, root = this.root) {
		if (!root) return false;                                                    // base case if BST is empty, return false

		if (val < root.val) {                                                       // if target val < root val, search left substree
			return this.searchRecur(val, root.left);
		} else if (val > root.val) {                                                // if target val > root val, search right substree
			return this.searchRecur(val, root.right);
		} else {                                                                    // target val == root val, found!
			return true;
		}
	}


	//       10
	//      / \
	//     5   16
	//    / \    \
	//   1   7    16
	searchIter(val) {

		let curNode = this.root;
		
		while(curNode) {
			if (val === curNode.val) return true;

			if (val < curNode.val) {
				curNode = curNode.left;

			} else if (val > curNode.val) {
				curNode = curNode.right;
			}
		}

		return false;
	}
}


module.exports = {
	TreeNode,
	BST
};