import mergeSort from './merge.js';
import generateRandomNumbers from './randomNumbers.js';

let node = (data, left, right)=>{
  return {data:null, left:null, right:null};
}

let tree = ()=>{
  // let root = buildTree(arr, 0, arr.length-1);

  function buildTree(arr, start=0, end=arr.length-1){
      if(start > end){
          let node1 = node();
          return node1;
      }else{
          let mid = parseInt((start+end)/2);
          let node1 = node();
          node1.data = arr[mid];
          node1.left = buildTree(arr, start, mid-1);
          node1.right = buildTree(arr, mid+1, end);
          return node1;
      }
  }

  function insert(val, Obj=root){
    if(Obj.data === null){
      Obj.data = val;
      Obj.left = node();
      Obj.right = node();
    }else{
      if(val >= Obj.data){
        if(Obj.right !== null){
          Obj = Obj.right;
          return insert(val, Obj);
        }else{
          let node1 = node();
          node1.data = val;
          Obj.right = node1;
        }
      }else{
        if(Obj.left !== null){
          Obj = Obj.left;
          return insert(val, Obj);
        }else{
          let node1 = node();
          node1.data = val;
          Obj.left = node1;
        }
      }
    }
    return Obj;
  }

  function del(val, Obj=root){
    if(Obj.data === null){
      return Obj;
    }else{
      if(Obj.data !== val){
        if(Obj.left.data !== val &&Obj.right.data !== val){
          if(val >Obj.data){
            Obj =Obj.right;
            return del(val, Obj);
          }else{
            Obj =Obj.left;
            return del(val, Obj);
          }
        }
        else{
          if(Obj.left.data === val){
            if(Obj.left.left.data !== null && Obj.left.right.data !== null){
              let node1 = Obj.left.right;
              while(node1 !== null){
                if(node1.left.data !== null){
                  Obj.left.data = node1.left.data;
                  node1.left = node();
                  node1 = null;
                }else{
                  Obj.left.data = node1.data;
                  Obj.left.right = node1.right;
                  node1 = null;
                }
              }
            }
            else if(Obj.left.right.data !== null){
              let node1 =Obj.left.right;
              Obj.left = node1;
            }else{
              Obj.left = node();
            }
          }
          else{
            if(Obj.right.left.data !== null && Obj.right.right.data !== null){
              let node1 = Obj.right.right;
              while(node1 !== null){
                if(node1.left.data !== null){
                  Obj.right.data = node1.left.data;
                  node1.left = node();
                  node1 = null;
                }else{
                  Obj.right.data = node1.data;
                  Obj.right.right = node1.right;
                  node1 = null;
                }
              }
            }
            else if(Obj.right.right.data !== null){
              let node1 =Obj.right.right;
              Obj.right = node1;
            }else{
              Obj.right = node();
            }
          }
        }
      }
    }
    return Obj;
  }

function levelOrder(getVal, root){
  let values = [];
  let nodeValues = [];
  values.push(root);
  while(values.length !== 0){
    if(values[0].data !== null){
      nodeValues.push(values[0].data);
    }
    let extractedValue = getVal(values[0]);
    values.shift();
    for(let val of extractedValue){
        values.push(val);
    }
  }
  return nodeValues;
}

function getValues(node){
  let values = [];
  if(node.left !== null){
    values.push(node.left);
  }
  if(node.right !== null){
    values.push(node.right);
  }
  return values;
}

function find(value){
  if(root.data === null || root.data === value){
    return root;
  }else{
    if(value > root.data){
      root = root.right;
      return find(value);
    }else{
      root = root.left;
      return find(value);
    }
  }
}

  return {insert, find, del, levelOrder, getValues, buildTree};
}

const removeDuplicates = (arr)=>{
  const noDuplicates = [];
  for(let val of arr){
      if(!noDuplicates.includes(val)){
          noDuplicates.push(val);
      }
  }
  return noDuplicates;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
     return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const printTree = (node, arr=[])=>{
  if(node === null){
    return arr;
  }else{
    if(node.data !== null){
      arr.push(node.data);
    }
    printTree(node.left, arr);
    printTree(node.right, arr);
    return arr;
  }
}

const inOrder = (node, arr=[])=>{
  if(node === null){
    return arr;
  }else{
    inOrder(node.left, arr);
    if(node.data !== null){
      arr.push(node.data);
    }
    inOrder(node.right, arr);
    return arr;
  }
}

const postOrder = (node, arr=[])=>{
  if(node === null){
    return arr;
  }else{
    postOrder(node.left, arr);
    postOrder(node.right, arr);
    if(node.data !== null){
      arr.push(node.data);
    }
    return arr;
  }
}

const height = (node, obj={}, count=0)=>{
  if(node === null){
    return obj
  }else{
    if(node.data !== null){
      obj[node.data] = {'height':count+1};
    }
    height(node.left, obj, count+1);
    height(node.right, obj, count+1);
  }
  let treeHeight = 0;
  for(let key in obj){
    if(obj[key]['height']>treeHeight){
      treeHeight = obj[key]['height'];
    }
  }
  return treeHeight;
}

const isBalanced = (node)=>{
  const leftSideHeight = (node,left=0)=>{
    if(node === null){
      return left-1;
    }else{
      return leftSideHeight(node.left, left+1);
    }
  }

  const rightSideHeight = (node,right=0)=>{
    if(node === null){
      return right-1;
    }else{
      return rightSideHeight(node.right, right+1);
    }
  }
  
  if((rightSideHeight(node)-leftSideHeight(node)) < 2){
    return true;
  }else{
    return false;
  }
}

const reBalance = (node)=>{
  let nodes = printTree(node);
  let sortedArray = mergeSort(nodes);
  let tree1 = tree();
  let balancedTree = tree1.buildTree(sortedArray);
  return balancedTree;
}

const original = removeDuplicates(generateRandomNumbers(15));
const sortedArray = mergeSort(original);
const tree1 = tree();
let root = tree1.buildTree(sortedArray);

prettyPrint(root);
console.log(`isBalanced: ${isBalanced(root)}`);
console.log(`preorder: ${printTree(root)}\ninorder: ${inOrder(root)}\npostorder: ${postOrder(root)}`);
tree1.insert(111, root);
tree1.insert(102, root);
tree1.insert(123, root);
tree1.insert(199, root);
tree1.insert(150, root);
prettyPrint(root);
console.log(`isBalanced: ${isBalanced(root)}`);
let rebalancedTree = reBalance(root);
prettyPrint(rebalancedTree);
console.log(`isBalanced: ${isBalanced(rebalancedTree)}`);
console.log(`level-order: ${tree1.levelOrder(tree1.getValues, rebalancedTree)}\n
preorder: ${printTree(rebalancedTree)}\ninorder: ${inOrder(rebalancedTree)}\npostorder: ${postOrder(rebalancedTree)}`);
