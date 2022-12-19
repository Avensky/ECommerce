export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// search for item in array
export const findItem = (array, id) => {
    return array.find(item=>item._id===id);
};

//replace item in array of objects with matching id
export const updateArray = (currentArray, updatedItem) => {
    return currentArray.map( obj => [updatedItem].find(item => item._id === obj._id) || obj);
};

//multiply item.price by amount in cart, then add each total
export const getTotalPrice = (cart) => {
    return cart.map(item => item.price*item.amount).reduce((prev, curr) => prev + curr, 0);
};

//get totalNumber of items
export const getTotalItems = (cart) => {
    return cart.reduce((a, b) => a + b.amount, 0);
};

//Copy array
export const copyArray = (array) =>{
    return JSON.parse(JSON.stringify(array));
};

//
export const storeLocally = ( arrayName, array ) => {
    let arrayString = JSON.stringify(array);
    localStorage.setItem(arrayName, arrayString);
};

export const removeItem  = ( array, id )=>{
    return array.filter(item=>item._id !== id)
}