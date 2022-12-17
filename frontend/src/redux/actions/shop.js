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
  console.log('getProductSuccess = ', product);
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

  console.log('id = ', id);
  return dispatch => {
      dispatch(getProductStart());
      const url = '/api/getProduct/'+id;
      console.log('url = ',url);
      axios.get( '/api/getProduct/'+id)
      .then( result => {
          const product = result.data.data;
          console.log('product = ', product);
          dispatch(getProductSuccess(product));
      })
      .catch( error => {
          console.log("getProduct error = "+JSON.stringify(error));
          dispatch(getProductFail(error));
      });
  };
};

export const resize = () => {
  const width = window.innerWidth;
  // const height = window.innerHeight;
  console.log(width); 
  return {
    type: actionTypes.RESIZE,
    width
  };
};