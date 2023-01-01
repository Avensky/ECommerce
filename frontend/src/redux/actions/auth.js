import axios from 'axios';
//import axios from 'axios-https-proxy-fix'; 
// const axios = require('axios-proxy-fix');
import * as actionTypes from './actionTypes';

export const auth = (values, auth, token) => {
    console.log('values = '+JSON.stringify(values));
    //console.log('authLogin = '+authLogin);
    return dispatch => {
        dispatch(authStart());
        let url;
        switch (auth) {
            case auth='login':
                url = '/api/login';
                break;
            case auth='register':
                url = '/api/signup';
                break;
            case auth='forgot-password':
                url = '/api/forgotPassword';
                break;
            case auth='reset-password':
                url = ('/api/resetPassword/'+token);
                console.log('url',url);
                break;
            default : url = '/api/login';
        };
        let method;
        auth === 'reset-password'
            ? method = axios.patch
            : method = axios.post;

        method(url, values)
            .then(response => {dispatch(authSuccess(response.data));
            })
            .catch(err => {dispatch(authFail(err));});
    };
};


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (user) => {
    console.log('res.data', user);
    return {
        type    : actionTypes.AUTH_SUCCESS,
        user  : user
    };
};

export const authFail = (error) => {
    return {
        type    : actionTypes.AUTH_FAIL,
        error   : error,
    };
};






export const getUserStart = () => {
    return {
        type: actionTypes.GET_USER_START
    };
};

export const getUserSuccess = (user) => {
    console.log('getUserSuccess ',user );
    return {
        type: actionTypes.GET_USER_SUCCESS,
        user: user
    };
};

export const getUserFail = (error) => {
    return {
        type: actionTypes.GET_USER_FAIL,
        error: error
    };
};

export const getUser = () => {
    return dispatch => {
        dispatch(getUserStart());
        axios.get('/api/getUser')
        .then( result => {
            console.log('result ',result);
            const user = result.data;
            dispatch(getUserSuccess(user));
        })
        .catch( error => {
            dispatch(getUserFail(error));
        });
    };
};





// 
// 
// export const getUsersStart = () => {
//     return {
//         type: actionTypes.GET_USERS_START
//     };
// };
// 
// export const getUsersSuccess = (payload) => {
//     return {
//         type: actionTypes.GET_USERS_SUCCESS,
//         payload: payload
//     };
// };
// 
// export const getUsersFail = (error) => {
//     return {
//         type: actionTypes.GET_USERS_FAIL,
//         error: error
//     };
// };
// 
// export const getUsers = () => {
//     return dispatch => {
//         dispatch(getUsersStart());
//         axios.get('/api/v1/getUsers')
//         .then( result => {
//             console.log(result);
//             const payload = result.data;
//             dispatch(getUsersSuccess(payload));
//         })
//         .catch( error => {
//                 dispatch(getUsersFail(error));
//         });
//     };
// };




// export const logout = () => {
//     axios.get('/api/logout');
//     localStorage.removeItem('token');
//     localStorage.removeItem('expirationDate');
//     localStorage.removeItem('userId');
//     return {
//         type: actionTypes.LOGOUT
//     };
// };
// 
// 
// export const checkLoginTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime * 1000);
//     };
// };
// 
// 
// 
// 
// export const connect = (values) => {
//     //console.log('values = '+values);
//     //console.log('connect = '+connect);
//     return dispatch => {
//         dispatch(connectStart());
//         let url = '/api/connect/local';     
//         axios.post(url, values)
//             .then(response => {
//                 //console.log('response = '+JSON.stringify(response));
//                 //console.log('response = '+response);
//                 dispatch(connectSuccess(response.data));
//              })
//              .catch(err => {
//                  //console.log('err = '+err);
//                  dispatch(connectFail(err));
//              });
//     };
// };
// 
// export const connectStart = () => {
//     return {
//         type: actionTypes.CONNECT_START
//     };
// };
// 
// export const connectSuccess = (token, userId) => {
//     return {
//         type    : actionTypes.CONNECT_SUCCESS,
//         idToken : token,
//         userId  : userId
//     };
// };
// 
// export const connectFail = (error) => {
//     return {
//         type    : actionTypes.CONNECT_FAIL,
//         error   : error,
//     };
// };
// 
// 
// 
// 
// 
// 
// export const fbAuth = () => {
//     return dispatch => {
//         dispatch(fbAuthStart());
//         dispatch(fbAuthSuccess());
//         //dispatch(fbAuthFail(err));
//     };
// };
// 
// export const fbAuthStart = () => {
//     return {
//         type    : actionTypes.FB_AUTH_START
//     };
// };
// 
// export const fbAuthSuccess = () => {
//     return {
//         type    : actionTypes.FB_AUTH_SUCCESS,
//     };
// };
// 
// export const fbAuthFail = (error) => {
//     return {
//         type    : actionTypes.FB_AUTH_FAIL,
//         error   : error
//     };
// };
// 
// 
// 
// 
// export const newAddressStart  = () =>{
//     return{
//         type: actionTypes.NEW_ADDRESS_START
//     };
// };
// 
// export const newAddressFail = (error) => {
//     return {
//         type: actionTypes.NEW_ADDRESS_FAIL,
//         error: error
//     };
// };
// 
// export const newAddressSuccess = (addressData) => {
//     return {
//         type: actionTypes.NEW_ADDRESS_SUCCESS,
//         addressData: addressData
//     };
// };
// 
// export const newAddress = (values) => {
//     return dispatch => {
//         dispatch(newAddressStart());
//         console.log('New Address Start');;
//         axios.post('/api/addAddress', values)
//             .then(response => {
//                 console.log('Axios Start');
//                 console.log(response);
//                 const data = response.data;
//                 console.log(data);
//                 dispatch(newAddressSuccess(data));
//         })
//         .catch(error => {
//             console.log(error);;
//             dispatch(newAddressFail(error));
//         }); 
//     };
// };
// 
// 
// 
// export const setAuthRedirectPath = (path) => {
//     return {
//         type: actionTypes.SET_AUTH_REDIRECT_PATH,
//         path: path
//     };
// };
