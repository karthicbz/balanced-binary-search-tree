export default function generateRandomNumbers(length){
    let numbers = [];
    for(let i=0; i<length; i++){
        numbers.push(Math.floor(Math.random()*100));
    }
    return numbers;
}