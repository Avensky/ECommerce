import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import classes from './Login.module.css';
import * as actions from '../../../../redux/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Logo from '../../../../components/Logo/Logo';
import { NavLink, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthNav from '../AuthNav/AuthNav';
import SocialAuth from '../SocialAuth/SocialAuth';
import AuthForm from '../AuthForm/AuthForm';

const Login = props => {
    const onAuth=(values,auth,token)=>{props.onAuth(values,auth,token);};
    let form;

    props.loading
        ? form = <Spinner />
        : form = <AuthForm onAuth={onAuth} message={props.message} loading={props.loading}/>;
    return(
        <div className='page-wrapper'>
            {props.user?  <Navigate to='/'/>:null}
            <div className={classes.Auth}>
                <NavLink to='/home'><Logo height='8vh'/></NavLink>
                <AuthNav style='login'/>
                <br />
                {form}
                <SocialAuth /> 
                
            </div>
        </div> 
    );
};

const mapStateToProps = state => {
    return {
        loading             : state.auth.loading,
        userLoading         : state.auth.userLoading,
        submitted           : state.auth.submitted,
        error               : state.auth.error,
        user          : state.auth.user,
        isAuthenticated     : state.auth.payload,
        authRedirectPath    : state.auth.authRedirectPath,
        message             : state.auth.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //onFetchUser             : ()                    => dispatch(),
        onAuth                  : (values, auth, token) => dispatch(actions.auth(values,auth,token )),
        //onFbAuth                : ()                    => dispatch(),
        //onSetAuthRedirectPath   : ()                    => dispatch(),
    };
};

Login.propTypes = {
    message : PropTypes.any,
    onAuth : PropTypes.func,
    onFetchUser : PropTypes.any,
    authRedirectPath : PropTypes.any,
    loading : PropTypes.any,
    fetchedUser : PropTypes.any,
    submitted : PropTypes.any,
    token : PropTypes.any,
    user : PropTypes.any,
};

export default connect (mapStateToProps, mapDispatchToProps)(Login);
