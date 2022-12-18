import * as actionTypes from './actionTypes';
import axios from 'axios';

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