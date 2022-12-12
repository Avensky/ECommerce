import * as actionTypes from './actionTypes';
import axios from 'axios';

/*******************************************
 * Get Items from database
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