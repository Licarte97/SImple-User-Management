//remove duplicates task

let array1 = [1, 2, 3, 1, 5, 3];
let array_no_duplicates = [];
array1.forEach(item => {
    //first solution
    // if (!array_no_duplicates.includes(item)) {
    //     array_no_duplicates.push(item);
    // }

    //2nd solution
    let result = array_no_duplicates.some((item2) => {
        if (item2 === item) {
            return true;
        }
    })
    if (!result) {
        array_no_duplicates.push(item);
    }
})
console.log(array_no_duplicates);