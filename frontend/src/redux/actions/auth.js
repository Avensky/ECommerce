import axios from 'axios';
import * as actionTypes from './actionTypes';

// Auth
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type    : actionTypes.AUTH_SUCCESS,
        data
    };
};

export const authFail = (error) => {
    return {
        type    : actionTypes.AUTH_FAIL,
        error   : error,
    };
};

export const auth = (values, auth, token) => {
    return dispatch => {
        dispatch(authStart());
        let url;
        switch (auth) {
            case auth='login'           : url = '/api/login'; 
                break;
            case auth='register'        : url = '/api/signup';
                break;
            case auth='forgot-password' : url = '/api/forgotPassword';
                break;
            case auth='reset-password'  : url = ('/api/resetPassword/'+token);
                break;
            default : url = '/api/login';
        };

        axios.post(url, values)
            .then(response => {
                const data = response.data.info;
                dispatch(authSuccess(data));
            })
            .catch(err => {dispatch(authFail(err));});
    };
};

//user
export const getUserStart = () => {
    return {
        type: actionTypes.GET_USER_START
    };
};

export const getUserSuccess = (data) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        data
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
            const data = result.data;
            dispatch(getUserSuccess(data));
        })
        .catch( error => {
            dispatch(getUserFail(error));
        });
    };
};

//logout
export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    };
};

export const logoutSuccess = (message) => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        message
    };
};

export const logoutFail = (error) => {
    return {
        type: actionTypes.LOGOUT_FAIL,
        error: error
    };
};
export const logout = () => {
    return dispatch => {
        dispatch(logoutStart());
        axios.get('/api/logout')
            .then( result => {
                const data = result.data;
                dispatch(logoutSuccess(data));
            })
            .catch( error => {
                dispatch(logoutFail(error));
            });
    };
};