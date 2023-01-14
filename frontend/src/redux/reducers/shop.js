import * as actionTypes from '../actions/actionTypes';
import { updateObject, findItem, updateArray, getTotalPrice, getTotalItems, copyArray,
removeItem, storeLocally} from '../../utility/utility';

const initialState = {
    products    : [],
    loading     : false,
    error       : null,
    product     : null,
    width       : null,
    cart        : [],
    totalItems  : 0,
    totalPrice  : 0,
};

// getProducts
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
    return updateObject( state, {
        products: action.products,
        loading: false
    });
};

// get a single product
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
    return updateObject( state, {
        product: action.product,
        loading: false
    });
};

//cart
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

const loadCart = ( state, action ) => {
    // get cart from local storage
    let arrayString = localStorage.getItem('cart');
    let array = [];
    if(arrayString){
        array = JSON.parse(arrayString);      
    };

    const totalItems = getTotalItems(array);
    const totalPrice = getTotalPrice(array);
    return {
        ...state,
        totalItems: totalItems,
        totalPrice: totalPrice,
        cart: array
    };
};

// track screen width
const resize = (state,action) => {
    return updateObject(state, {
        width: action.width
    });
};

//checkout

const checkoutStart = (state,action) => {
    return updateObject(state, {
        loading : true
    });
};
const checkoutFail = (state,action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};
const checkoutSuccess = (state,action) => {
    return updateObject(state, {
        loading: false,
//        message: action.message
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

        case actionTypes.LOAD_CART                     : return loadCart(state, action);
//        case actionTypes.ORDER_BY                   : return orderBy(state, action);
        case actionTypes.RESIZE                        : return resize(state, action);

        case actionTypes.CHECKOUT_START                : return checkoutStart(state, action);
        case actionTypes.CHECKOUT_FAIL                 : return checkoutFail(state, action);
        case actionTypes.CHECKOUT_SUCCESS              : return checkoutSuccess(state, action);

        default: return state;
    }
};

export default reducer;
