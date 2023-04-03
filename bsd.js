import mergeSort from './merge.js';

let node = (data, left, right)=>{
  return {data:null, left:null, right:null};
}

let tree = (arr)=>{
  let root = buildTree(arr, 0, arr.length-1);

  function buildTree(arr, start, end){
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

function levelOrder(getVal){
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

  return {root, insert, find, del, levelOrder, getValues};
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

const original = removeDuplicates([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 322]);
const sortedArray = mergeSort(original);
const tree1 = tree(sortedArray);
// tree1.del(4);
// tree1.del(322);
// tree1.del(324);
// tree1.del(5);
// tree1.del(9);
// tree1.del(1);
// tree1.del(67);
// // tree1.del(6345);
prettyPrint(tree1.root);
console.log(tree1.levelOrder(tree1.getValues));
console.log(inOrder(tree1.root));
console.log(postOrder(tree1.root));

// const myTree = tree1.root;
// console.log(printTree(myTree));