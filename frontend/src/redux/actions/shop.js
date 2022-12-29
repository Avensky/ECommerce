import * as actionTypes from './actionTypes';
import axios from 'axios';
import keys from '../../config/keys';
import { loadStripe } from '@stripe/stripe-js';

// console.log('stipe key', keys.stripePublishableKey);
let stripePromise = loadStripe(keys.stripePublishableKey);


/*******************************************
 * Get all products from database
*******************************************/
export const checkoutStart = () => {
  return{
    type: actionTypes.CHECKOUT_START,
  };
};
export const checkoutSuccess = async (id) => {
  // Get Stripe.js instance
  const stripe = await stripePromise;
  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({sessionId: id,});
  
  return{
    type: actionTypes.CHECKOUT_SUCCESS,
    //result
  };
};

export const checkoutFail = (error) => {
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
  console.log(error);
  return {
    type: actionTypes.CHECKOUT_FAIL,
    error
  };
};

export const checkout = (cart, user, event) => {
  let line_items = cart.map( item => {
      let data = {
          price       : item.priceid,
          quantity    : item.orderAmt,
          //tax_rates   : [keys.taxRates]
      };
      console.log('data = '+JSON.stringify(data));
      return data;
  });
  
  let body; 
  user 
    ? body = {items: line_items,userid: user['_id']}
    : body = {items: line_items};

  console.log('body = ', body);

  return dispatch => {
    dispatch(checkoutStart());
    // Call your backend to create the Checkout Session
    axios.post('/api/checkout', body)
      .then( res => {
        const session = res.data; 
        console.log('checkout', session);
        dispatch(checkoutSuccess(session.id));
      })
      .catch( err => {
        console.log('err', err);
        dispatch(checkoutFail(err));
      });
  };

};

/*******************************************
 * Get all products from database
*******************************************/
export const getProductsSuccess = (products) => {
  return {
      type:  actionTypes.GET_PRODUCTS_SUCCESS,
      products
  };
};
export const getProductsFail = (error) => {
  return {
      type:  actionTypes.GET_PRODUCTS_FAIL, 
      error
  };
};
export const getProductsStart = () => {
  return {
      type:  actionTypes.GET_PRODUCTS_START
  };
};
export const getProducts = () => {
  return dispatch => {
      dispatch(getProductsStart());
      axios.get( '/api/getProducts')
      .then( result => {
          const products = result.data;
          dispatch(getProductsSuccess(products));
      })
      .catch( error => {
          console.log("getProducts error = "+JSON.stringify(error));
          dispatch(getProductsFail(error));
      });
  };
};

/*******************************************
 * Get product from database
*******************************************/
export const getProductSuccess = (product) => {
  //console.log('getProductSuccess = ', product);
  return {
      type:  actionTypes.GET_PRODUCT_SUCCESS,
      product
  };
};
export const getProductFail = (error) => {
  return {
      type:  actionTypes.GET_PRODUCT_FAIL, 
      error
  };
};
export const getProductStart = () => {
  return {
      type:  actionTypes.GET_PRODUCT_START
  };
};
export const getProduct = (id) => {
  return dispatch => {
      dispatch(getProductStart());
      axios.get( '/api/getProduct/'+id)
      .then( result => {
          dispatch(getProductSuccess(result.data.data));
      })
      .catch( error => {
          dispatch(getProductFail(error));
      });
  };
};

/*******************************************
 * Get screen size
*******************************************/
export const resize = () => {
  const width = window.innerWidth;
  // const height = window.innerHeight;
  // console.log(width); 
  return {
    type: actionTypes.RESIZE,
    width
  };
};

/*******************************************
 * Get screen size
*******************************************/
// add cart action
export const addToCart= (id)=>{
  return{
      type: actionTypes.ADD_TO_CART,
      id
  };
};

export const subtractFromCart= (id)=>{
  return{
      type: actionTypes.SUBTRACT_FROM_CART,
      id
  };
};

export const removeFromCart = id => {
  return{
    type: actionTypes.REMOVE_FROM_CART,
    id
  };
};

export const loadCart = ( values ) => {
  // local storage
  return{
      type: actionTypes.LOAD_CART,
  };
};

export const loadShop = ( values ) => {
  return{
      type: actionTypes.LOAD_SHOP,
      values
  };
};