import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    userLoading: false,
    payload: null,
    users: null,
    user: null,
    message:'',
    authRedirectPath: '/',
    submitted: false,
    addressData: null,
    getUserMessage: null,
};

const authStart = ( state, action ) => {
    return updateObject( state, { 
        error: null, 
        loading: true,
    });
};

const authSuccess = (state, action) => {
    console.log('authSuccess data', action.data);
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

// const connectStart = ( state, action ) => {
//     return updateObject( state, { 
//         error: null, 
//         loading: true, 
//         authRedirectPath: '/'
//     });
// };
// 
// const connectSuccess = (state, action) => {
//     console.log(action.idToken);
//     if (action.idToken === 'OK'){
//         return updateObject( state, { 
//             token: action.idToken,
//             error: null,
//             loading: false,
//             authRedirectPath: '/profile'
//          });
//     } else {
//         return updateObject( state, { 
//             token: action.idToken,
//             error: null,
//             loading: false,
//             authRedirectPath:"/"
//      });
//     };
// };
// 
// const connectFail = (state, action) => {
//     return updateObject( state, {
//         error: action.error,
//         message: action.error.message,
//         loading: false,
//     });
// };
// 
// 
// const fbAuthStart = ( state, action ) => {
//     return updateObject( state, { error: null, loading: true } );
// };
// 
// const fbAuthSuccess = (state, action) => {
//     return updateObject( state, { 
//         error: null,
//         loading: false,
//         submitted: true
//     });
// };
// 
// const fbAuthFail = (state, action) => {
//     return updateObject( state, {
//         error: action.error,
//         loading: false
//     });
// };
// 
// 
// 

const getUserStart = (state, action) => {
    console.log('getUserStart');
    return updateObject(state, {
        error: null,
        loading: true,
    });
};

const getUserSuccess = (state, action) => {
    console.log('data', action.data);
    return updateObject(state, {
        user: action.data.user,
        getUserMessage: action.data.message,
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

const logoutStart = (state, action) => {
    console.log('loutout Start');
    return updateObject(state, {
        error: null,
    });
};

const logoutSuccess = (state, action) => {
    //console.log('logout message ', action.message);
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






//const getUsersStart = (state, action) => {
//    return updateObject(state, {
//        error: null,
//        userLoading: true
//    });
//};
//
//const getUsersSuccess = (state, action) => {
//    console.log(action);
//    return updateObject(state, {
//        users: action.payload,
//        error: null,
//        loading: false,
//        userLoading: false
//    });
//};
//const getUsersFail = (state, action) => {
//    return updateObject( state, {
//        error: action.error,
//        loading: false,
//        userLoading: false
//    });
//};
//
//const authLogout = (state, action) => {
//    return updateObject(state, { token: null, userId: null });
//};
//
//const setAuthRedirectPath = (state, action) => {
//    return updateObject(state, { authRedirectPath: action.path });
//};
//
//const newAddressStart = (state, action) => {
//    return updateObject( state, {        
//        error: null, 
//        loading: true,
//        addressData: null });
//};
//
//const newAddressFail = (state, action) => {
//    return updateObject( state, { 
//        loading: false, 
//        error: action.error,
//    });
//};
//  
//const newAddressSuccess = (state, action) => {
//    //const newAddress = updateObject(action.addressData, { id: action.addressId })
//    return updateObject(state, {
//        loading: false,
//        addressData: action.addressData 
//    });
//};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_USER_START       : return getUserStart(state, action);
        case actionTypes.GET_USER_SUCCESS     : return getUserSuccess(state, action);
        case actionTypes.GET_USER_FAIL        : return getUserFail(state, action);
//        case actionTypes.GET_USERS_START      : return getUsersStart(state, action);
//        case actionTypes.GET_USERS_SUCCESS    : return getUsersSuccess(state, action);
//        case actionTypes.GET_USERS_FAIL       : return getUsersFail(state, action);
//       case actionTypes.FB_AUTH_START          : return fbAuthStart(state, action);
//       case actionTypes.FB_AUTH_SUCCESS        : return fbAuthSuccess(state, action);
//       case actionTypes.FB_AUTH_FAIL           : return fbAuthFail(state, action);
       case actionTypes.AUTH_START             : return authStart(state, action);
       case actionTypes.AUTH_SUCCESS           : return authSuccess(state, action);
       case actionTypes.AUTH_FAIL              : return authFail(state, action);

       case actionTypes.LOGOUT_START             : return logoutStart(state, action);
       case actionTypes.LOGOUT_SUCCESS           : return logoutSuccess(state, action);
       case actionTypes.LOGOUT_FAIL              : return logoutFail(state, action);

//       case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action);
//       case actionTypes.CONNECT_START          : return connectStart(state, action);
//       case actionTypes.CONNECT_SUCCESS        : return connectSuccess(state, action);
//       case actionTypes.CONNECT_FAIL           : return connectFail(state, action);
        //case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action);
//        case actionTypes.NEW_ADDRESS_START      : return newAddressStart(state, action);
//        case actionTypes.NEW_ADDRESS_SUCCESS    : return newAddressSuccess(state, action);     
//        case actionTypes.NEW_ADDRESS_FAIL       : return newAddressFail(state, action);     
        default:
            return state;
    };
};

export default reducer;