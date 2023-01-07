import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import classes from './Login.module.css';
import * as actions from '../../../../redux/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../../../components/Logo/Logo';
import { NavLink, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthNav from '../AuthNav/AuthNav';

const Login = props => {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {setPasswordShown(passwordShown ? false : true);};

    const submitHandler = ( values, submitProps ) => {
        //console.log('Form data', values)
        //console.log('submitProps', submitProps)
        const auth='login';
        props.onAuth( values, auth);
        submitProps.setSubmitting(false);
        submitProps.resetForm();
    };

    let initialValues, validationSchema, selected, unselected, form, button, authSelector, socialAuth, loader;

            initialValues = {
                email: '', 
                password: ''
            };
            validationSchema = Yup.object({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!"),
                password: Yup.string()
                    .min(8, "Minimum 8 characters")
                    .max(15, "Maximum 15 characters")
                    .required("Required!")
            });

            props.loading
                ? form = <Spinner />
                : form = <>
                    <div className='flex'>
                        <Field 
                            type="email" 
                            name="email" 
                            placeholder="Email Address"
                            className={classes.AuthInput}
                        />                        
                    </div>
                    <ErrorMessage className='color-orange'name="email" component="div" />
                    <div className='flex'>
                        <Field 
                            type={passwordShown ? "text" : "password"}
                            name="password" 
                            placeholder="Password"
                            className={classes.AuthInput}
                        /><span className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"}  onClick={togglePasswordVisiblity} ></span>
                    </div>
                    <ErrorMessage className='color-orange'name="password" component="div" />
                    <br />
                    <div className='text-right'><NavLink to='/forgotPassword'>Forgot Password?</NavLink></div>
                </>;
            button = <div className={classes.BtnDiv}><span className={['fa fa-sign-in'].join(' ')}></span> Sign In</div>;
            !props.loading
                ? socialAuth = <>
                    <br />
                    <div className='text-left'>Or continue with:</div>
                    <br />
                    <button type='submit' className={[classes.Btn, "btn-primary"].join(' ')}>
                        <a  
                            href="/api/facebook"
                            //onClick={socialAuthHandler}
                        ><div className={classes.BtnDiv}><span className="fa fa-facebook" /> Facebook</div></a>
                    </button>
                    <button className={[classes.Btn, "btn-info"].join(' ')}>
                        <a href="/api/twitter"><div className={classes.BtnDiv}><span className="fa fa-twitter" /> Twitter</div></a>
                    </button>
                    <button className={[classes.Btn, "btn-danger"].join(' ')}>
                        <a href="/api/google"><div className={classes.BtnDiv}><span className="fa fa-google-plus" /> Google+</div></a>
                    </button>
                </>
                : socialAuth = null;
            

    let message = false;
    if ( props.token ) {
        message = <p className='color-orange'>{props.token.message}</p>;
    };

    return(
        <div className='page-wrapper'>
            {props.user?  <Navigate to='/'/>:null}
            <div className={classes.Auth}>
                <NavLink to='/home'>
                    <Logo height='8vh'/>
                </NavLink>
                <AuthNav style='login'/>
                <br />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitHandler}
                    enableReinitialize> 
                    { formik => 
                    <Form>
                        {message}
                        {form}
                        <br />
                        <button  
                            className={[classes.Btn, classes.AuthBtn, 'auth-btn' ].join(' ')}
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting }
                        >
                            {button}
                        </button>
                    </Form>}
                </Formik>
                {socialAuth}
                
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
        token               : state.auth.token
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
    match : PropTypes.any,
    onAuth : PropTypes.any,
    onFetchUser : PropTypes.any,
    authRedirectPath : PropTypes.any,
    loading : PropTypes.any,
    fetchedUser : PropTypes.any,
    submitted : PropTypes.any,
    userLoading : PropTypes.any,
    token : PropTypes.any,
    user : PropTypes.any,
};

export default connect (mapStateToProps, mapDispatchToProps)(Login);
