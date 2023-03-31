export default function mergeSort(arr){
    if(arr.length < 2){
        return arr;
    }else{
        let mid = parseInt(arr.length/2);
        return mergeArrays(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid, arr.length)));
    }
}

function mergeArrays(arr1, arr2){
    let i=0;
    let j=0;
    let temp = [];
    while(i<arr1.length && j<arr2.length){
        if(arr1[i] < arr2[j]){
            temp.push(arr1[i]);
            i++;
        }else{
            temp.push(arr2[j]);
            j++;
        }
    }
    if(i<j){
        for(let k=i; k<arr1.length; k++){
            temp.push(arr1[k]);
        }
    }else{
        for(let k=j; k<arr2.length; k++){
            temp.push(arr2[k]);
        }
    }
    return temp;
}

// console.log(mergeSort([4,8,6,2,1,7,5,3,-2]));