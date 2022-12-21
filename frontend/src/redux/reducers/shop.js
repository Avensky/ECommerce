import * as actionTypes from '../actions/actionTypes';
import { updateObject, findItem, updateArray, getTotalPrice, getTotalItems, copyArray,
removeItem, getLocalStorage, storeLocally} from '../../utility/utility';

const initialState = {
    products    : [],
    loading     : false,
    error       : null,
    product     : null,
    width       : null,
//    posted      : false,
//    itemById    : [],
    cart        : [],
//    shop        : [],
    totalItems  : 0,
    totalPrice  : 0,
//    orderby     : null,
//    cartLoaded  : false,
//    shopLoaded  : true,
};

// const newItemStart = (state, action) => {
//     return updateObject( state, { posted: false });}
// 
// const newItemFail = (state, action) => {
//     return updateObject( state, { 
//         loading: false })}
//   
// const newItemSuccess = (state, action) => {
//     const newItem = updateObject(action.itemData, { id: action.itemId })
//     return updateObject(state, {
//         loading: false,
// //        items: state.products.concat( newItem ) 
//     })}
// 
// const getItemByIdStart = (state, action) => {
//     return updateObject( state, {
//         loading: true})}
// 
// const getItemByIdFail = (state, action) => {
//     return updateObject( state, {
//         loading: false})}
// 
// const getItemByIdSuccess = (state, action) => {
//     return updateObject( state, {
//         itemById: action.itemById,
//         loading: false,})}
// 
// 
// 
// 
// 
// 
// const getItemByTypeStart = (state, action) => {
//     return updateObject( state, {
//         loading: true})}
// 
// const getItemByTypeFail = (state, action) => {
//     return updateObject( state, {
//         loading: false})}
// 
// const getItemByTypeSuccess = (state, action) => {
// 
//     return updateObject( state, {
//         items : action.items,
//         loading: false,})}
//         
// const deleteItemStart = (state, action) => {
//     return updateObject( state, {
//         loading: true})}
// 
// const deleteItemFail = (state, action) => {
//     return updateObject( state, {
//         loading: false})}
// 
// const deleteItemSuccess = (state, action) => {
//     return updateObject( state, {
//         loading: false,})}
// 
// 

const getProductsStart = (state, action) => {
    return updateObject( state, { 
        loading: true 
    });
};
    
const getProductsFail = (state, action) => {
    return updateObject( state, { 
        loading: false 
    });
};
    
const getProductsSuccess = (state, action) => {
//    console.log('getProductsSuccess = ' + JSON.stringify(action.products))
    return updateObject( state, {
        products: action.products,
        loading: false
    });
};





const getProductStart = (state, action) => {
    return updateObject( state, { 
        loading: true 
    });
};
    
const getProductFail = (state, action) => {
    return updateObject( state, { 
        loading: false 
    });
};
    
const getProductSuccess = (state, action) => {
    //console.log('getProductSuccess = ',action.product);
    return updateObject( state, {
        product: action.product,
        loading: false
    });
};






 const addToCart = ( state, action ) => {
    //get products
    const products= copyArray(state.products);
    console.log('products = ', products);

    //get product data
    const product = findItem(products, action.id);
    console.log('product = ', product);

    //get cart
    const cart = copyArray(state.cart);
    console.log('cart = ', cart);

    //search for item in cart
    let cartItem = findItem(cart, action.id);
    console.log('cartItem: ', cartItem);

    let updatedCart;

    if (cartItem) {
        //if stock allows add to order
        if (cartItem.orderAmt < product.stock){
            console.log('cartItem.orderAmt ', cartItem.orderAmt);
            console.log('product.stock ', product.stock);
            cartItem.orderAmt +=1;
            updatedCart = updateArray(cart, cartItem);
            console.log('updatedCart = ', updatedCart);            
        } else {
            updatedCart = cart;
        }
    }
    
    //if no such item in cart copy original
    if (!cartItem) {
        cartItem = {...product};
        console.log('cartItem: ', cartItem);
        cartItem.orderAmt = 1;
        updatedCart = [...cart, cartItem];
        console.log('updatedCart = ', updatedCart);
    }

    storeLocally('cart', updatedCart);
    const totalPrice = getTotalPrice(updatedCart);
    console.log('total = $', totalPrice);
    const totalItems = getTotalItems(updatedCart);
    console.log('total items = ', totalItems);

    return{      
        ...state,
        cart        : updatedCart,
        totalPrice  : totalPrice,
        totalItems  : totalItems,
        //shop        : shop
     };
 };

const subtractFromCart = ( state, action ) => {
    const cart = copyArray(state.cart);
    let cartItem = findItem(cart, action.id);
    let updatedCart;
    //if the qt == 0 then it should be removed
    if (cartItem && (cartItem.orderAmt > 1) ){
        cartItem.orderAmt -= 1;
        updatedCart = updateArray(cart, cartItem);
    } else {
        updatedCart = removeItem(cart, action.id);
    }
    storeLocally('cart', updatedCart);
    const totalPrice = getTotalPrice(updatedCart);
    const totalItems = getTotalItems(updatedCart);

    return{
        ...state,
        cart        : updatedCart,
        totalPrice  : totalPrice,
        totalItems  : totalItems,
//        shop        : shop
    };
};

const removeFromCart = (state, action) => {
    const cart = copyArray(state.cart);
    let updatedCart = removeItem(cart, action.id);

    storeLocally('cart', updatedCart);
    const totalPrice = getTotalPrice(updatedCart);
    const totalItems = getTotalItems(updatedCart);

    return {
        ...state,
        cart: updatedCart,
        totalPrice : totalPrice,
        totalItems: totalItems,

    };
};


//const addShipping = ( state, action ) => {
//    return  { 
//        state,
//        total: state.total + 6 
//    }
//}
//
//const subShipping = ( state, action ) => {
//    return {
//        state,
//        total: state.total - 6 
//    }
//}
//
const loadCart = ( state, action ) => {
    // get cart from local storage
    console.log(' getLocalStorage');
    let arrayString = localStorage.getItem('cart');
    console.log('arrayString', arrayString);
    let array = [];
    if(arrayString){
        array = JSON.parse(arrayString);      
    };

    console.log('load cart', array);
//    let stringLocalAddedItems = localStorage.getItem("addedItems");
//    let addedItems = [];
//    let items = [...state.products];
//    let shop, totalItems, total;
//
//    if (stringLocalAddedItems){
//        let localAddedItems = JSON.parse(stringLocalAddedItems);
//        addedItems = localAddedItems;
//    };
//
//    if (items.length>0 && state.orderby==='Lowest price') {
//        if(addedItems.length>0){
//            shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj).sort( function ( a, b ) { return a.price - b.price; });
//        } else {
//            shop = items.sort( function ( a, b ) { return a.price - b.price; });
//        };
//        console.log('loadCart Lowest price = ',shop);
//    };
//    if (items.length>0 && state.orderby==='Highest price') {
//        if(addedItems.length>0){
//            shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj).sort( function ( a, b ) { return b.price - a.price; });
//        } else {
//            shop = items.sort( function ( a, b ) { return b.price - a.price; });
//        };
//        console.log('loadCart Highest price = ',shop);
//    }
//    else {
//        shop = items;
//        console.log('loadCart = ',shop);
//    };
//    
//    totalItems=addedItems.reduce((a, b) => a + b.amount, 0);
//    total = addedItems.map(item => item.price*item.amount).reduce((prev, curr) => prev + curr, 0);
    
    const totalItems = getTotalItems(array);
    const totalPrice = getTotalPrice(array);
    return {
        ...state,
//        shop        : shop,
//        cartLoaded  : true,
        totalItems: totalItems,
        totalPrice: totalPrice,
        cart: array
    };
};

const loadShop = (state, action) => {
//    let items       = state.products;
//    let shop        = state.shop;
//    let addedItems  = state.addedItems;
//    let orderby     = action.values;
//    console.log('loadShop orderby= ' + JSON.stringify(orderby));
//    //let orderby = state.orderby
//    console.log('loadShop state orderby= ' +JSON.stringify(state.orderby));
//    if (!orderby && state.orderby) {
//        orderby = state.orderby;
//    }
//    if (orderby) {
//        if (orderby.value==='Lowest price') {
//            console.log('LoadShop lowest price');
//            if(addedItems.length>0){
//                console.log('addedItems.length>0'+JSON.stringify(items));
//                shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj).sort( function ( a, b ) { return a.price - b.price; });
//            } else {
//                console.log('else'+items);
//                shop = items.map( item => item).sort( function ( a, b ) { return a.price - b.price; });
//            };
//        };
//        if (orderby.value ==='Highest price') {
//            console.log('LoadShop Highest price');
//            if(addedItems.length>0){
//                console.log('addedItems.length>0'+items);
//                shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj).sort( function ( a, b ) { return b.price - a.price; });
//            } else {
//                console.log('else'+items);
//                shop = items.map( item => item).sort( function ( a, b ) { return b.price - a.price; });
//            };
//        };
//        if (orderby.value ==='Most recent') {
//            console.log('date loadShop');
//            if(addedItems.length>0){
//                shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj).sort( function ( a, b ) { return b.date - a.date; });
//            } else {
//                shop = items.sort( function ( a, b ) { return b.date - a.date; });
//            };
//        };
//        if (orderby.value ==='Most Popular') {
//            console.log('sold loadShop');
//            if(addedItems.length>0){
//                shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj).sort( function ( a, b ) { return b.sold - a.sold; });
//            } else {
//                shop = items.sort( function ( a, b ) { return b.sold - a.sold; });
//            }
//        };
//    } else {
//        shop = items.map( obj => addedItems.find(item => item._id === obj._id) || obj);
//        console.log('loadShop = ',shop);
//    }
    return updateObject (state, {
//        orderby: orderby,
//        shop: shop,
//        shopLoaded  : true
    });
};

// const orderBy = (state, action) => {
//     //let shop=state.shop.sort( function ( a, b ) { return b.price - a.price; } );
//     console.log('orderby '+JSON.stringify(action.values.value));
//     //console.log('orderby '+ action.values);
// 
// //    console.log('orderBy')
//     return updateObject (state, {
//         orderby: action.values.value
//     })
// }
// 
// const checkoutStart = (state, action) => {
//     return updateObject (state, {
//             error: null,
//             loading: true,
//         }
//     )
// }
// const checkoutFail = (state, action) => {
//     return updateObject(state, {
//             loading: false,
//             error: action.error
//         }
//     )
// }
// const checkoutSuccess = (state, action) => {
//     return updateObject(state, {
//             loading: false,
//             checkout: action.response
//         }
//     )
// }

const resize = (state,action) => {
    return updateObject(state, {
        width: action.width
    });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
//        case actionTypes.NEW_ITEM_SUCCESS           : return newItemSuccess(state, action);
//        case actionTypes.NEW_ITEM_FAIL              : return newItemFail(state, action);
//        case actionTypes.NEW_ITEM_START             : return newItemStart(state, action);
//                
//        case actionTypes.DELETE_ITEM_SUCCESS        : return deleteItemSuccess(state, action);
//        case actionTypes.DELETE_ITEM_FAIL           : return deleteItemFail(state, action);
//        case actionTypes.DELETE_ITEM_START          : return deleteItemStart(state, action);
//
//        case actionTypes.GET_ITEM_BY_ID_SUCCESS     : return getItemByIdSuccess(state, action);
//        case actionTypes.GET_ITEM_BY_ID_FAIL        : return getItemByIdFail(state, action);
//        case actionTypes.GET_ITEM_BY_ID_START       : return getItemByIdStart(state, action);
//        
//        case actionTypes.GET_ITEM_BY_TYPE_SUCCESS   : return getItemByTypeSuccess(state, action);
//        case actionTypes.GET_ITEM_BY_TYPE_FAIL      : return getItemByTypeFail(state, action);
//        case actionTypes.GET_ITEM_BY_TYPE_START     : return getItemByTypeStart(state, action);

        case actionTypes.GET_PRODUCTS_SUCCESS          : return getProductsSuccess(state, action);
        case actionTypes.GET_PRODUCTS_FAIL             : return getProductsFail(state, action);
        case actionTypes.GET_PRODUCTS_START            : return getProductsStart(state, action);
  
        case actionTypes.GET_PRODUCT_SUCCESS           : return getProductSuccess(state, action);
        case actionTypes.GET_PRODUCT_FAIL              : return getProductFail(state, action);
        case actionTypes.GET_PRODUCT_START             : return getProductStart(state, action);
  
        case actionTypes.ADD_TO_CART                   : return addToCart(state, action);
        case actionTypes.SUBTRACT_FROM_CART            : return subtractFromCart(state, action);
        case actionTypes.REMOVE_FROM_CART              : return removeFromCart(state, action);
//        case actionTypes.REMOVE_ITEM                : return removeItem(state, action);
//        case actionTypes.ADD_QUANTITY               : return addQuantity(state, action);
//        case actionTypes.ADD_SHIPPING               : return addShipping(state, action);
//        case actionTypes.SUB_SHIPPING               : return subShipping(state, action); 
        case actionTypes.LOAD_CART                     : return loadCart(state, action);
        case actionTypes.LOAD_SHOP                     : return loadShop(state, action);
//        case actionTypes.ORDER_BY                   : return orderBy(state, action);
//        case actionTypes.CHECKOUT_START             : return checkoutStart(state, action);
//        case actionTypes.CHECKOUT_FAIL              : return checkoutFail(state, action);
//        case actionTypes.CHECKOUT_SUCCESS           : return checkoutSuccess(state, action);
 
        case actionTypes.RESIZE                        : return resize(state, action);

        default: return state;
    }
};

export default reducer;
