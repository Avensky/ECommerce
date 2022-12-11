import * as actionTypes from './actionTypes';
import axios from 'axios';

/*******************************************
 * Get Items from database
*******************************************/
export const getItemsSuccess = (items) => {
  return {
      type:  actionTypes.GET_ITEMS_SUCCESS,
      items
  }
}
export const getItemsFail = (error) => {
  return {
      type:  actionTypes.GET_ITEMS_FAIL, 
      error
  }
}
export const getItemsStart = () => {
  return {
      type:  actionTypes.GET_ITEMS_START
  }
}
export const getItems = () => {
  return dispatch => {
      dispatch(getItemsStart())
      axios.get( '/api/items')
      .then( result => {
          const items = result.data
              dispatch(getItemsSuccess(items));
      })
      .catch( error => {
          console.log("getItems error = "+JSON.stringify(error))
          dispatch(getItemsFail(error));
      })}}
