import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    error: null,
    loading: false,
    user: null,
    message:'',
};

// auth
const authStart = ( state, action ) => {
    return updateObject( state, { 
        error: null, 
        loading: true,
    });
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        user: action.data.user,
        message: action.data.message,
        error: null,
        loading: false,
     });
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
    });
};


// getUser
const getUserStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    });
};

const getUserSuccess = (state, action) => {
    return updateObject(state, {
        user: action.data.user,
        error: null,
        loading: false,
    });
};

const getUserFail = (state, action) => {
    return updateObject( state, {
        user: null,
        error: action.error,
        loading: false,
    });
};

// logout
const logoutStart = (state, action) => {
    return updateObject(state, {
        error: null,
    });
};

const logoutSuccess = (state, action) => {
    return updateObject(state, {
        message: null,
        user:null, 
        error: null,
        loading: false,
    });
};
const logoutFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
    });
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        // Get User
        case actionTypes.GET_USER_START       : return getUserStart(state, action);
        case actionTypes.GET_USER_SUCCESS     : return getUserSuccess(state, action);
        case actionTypes.GET_USER_FAIL        : return getUserFail(state, action);
    
        // Authentication
        case actionTypes.AUTH_START             : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS           : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL              : return authFail(state, action);

        case actionTypes.LOGOUT_START             : return logoutStart(state, action);
        case actionTypes.LOGOUT_SUCCESS           : return logoutSuccess(state, action);
        case actionTypes.LOGOUT_FAIL              : return logoutFail(state, action);

        default:
            return state;
    };
};

export default reducer;