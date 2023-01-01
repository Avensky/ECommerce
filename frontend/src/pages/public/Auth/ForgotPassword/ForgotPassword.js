import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import classes from './ForgotPassword.module.css';
import * as actions from '../../../../redux/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../../../components/Logo/Logo';
import PropTypes from 'prop-types';

const ForgotPassword = props => {
    const [auth, setAuth] = useState('login');
    console.log('auth',auth);
    const [token, setToken] = useState(props.match.params.token);
    console.log('token',token);

    const [passwordComfirmShown, setPasswordComfirmShown] = useState(false);    
    const togglePasswordComfirmVisiblity = () => {setPasswordComfirmShown(passwordComfirmShown ? false : true);};
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {setPasswordShown(passwordShown ? false : true);};

    useEffect(() => {
        console.log('ping');
        if (props.match.params.token){
            setAuth('reset-password');
        } else {
            setAuth('login');
        };
    },[props.match.params]);

    const loginToggleHandler    = () => {setAuth('login');};
    const registerToggleHandler = () => {setAuth('register');};
    const forgotPasswordHandler = () => {setAuth('forgot-password');};
    const resetPasswordHandler  = () => {setAuth('reset-password');};

    const submitHandler = ( values, submitProps ) => {
        //console.log('Form data', values)
        //console.log('submitProps', submitProps)
        props.onAuth( values, auth, token);
        submitProps.setSubmitting(false);
        submitProps.resetForm();
    };

    useEffect(()=> {
        const fetchData = async () => {props.onFetchUser();};
          if ( !props.fetchedUser){fetchData();}
        }, [props.fetchedUser, props.authRedirectPath]);

    // let act = 'login';
    // if (!auth) {
    //     act = 'signup'
    // }
    // const [formValues, setFormValues] = useState(null)

    let initialValues, validationSchema, selected, unselected, form, button, authSelector, socialAuth, loader;
            initialValues = {
                email: ''
            };
            validationSchema = Yup.object({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Required!")
            });
            selected = [classes.AuthToggle, classes.AuthSelected].join(' ');
            unselected = classes.AuthToggle;
            authSelector = <div className={classes.AuthNav}>
                <NavLink to='/login' className={unselected}>
                    <h1 className="pointer"><span className="fa fa-sign-in pointer" /> Login</h1>
                </NavLink>
                <NavLink to = '/register' className={unselected}>
                    <h1 className="pointer"><span className="fa fa-user" /> Signup</h1>
                </NavLink>   
            </div>;

            props.loading || props.submitted && props.userLoading
                ? form = <Spinner />
                : form = <>
                    <Field 
                        type="email" 
                        name="email" 
                        placeholder="Email Address"
                        className={classes.AuthInput}
                    />
                    <ErrorMessage className='color-orange'name="email" component="div" />
                </>;
            button = <div className={classes.BtnDiv}><span className={['fa fa-user'].join(' ')}></span>Forgot Password</div>;
            
    let message = false;
    if ( props.token ) {
        message = <p className='color-orange'>{props.token.message}</p>;
    };

    return(
        <div className={[classes.Card, classes.Auth].join(' ')}>
            <NavLink to='/home'>
                <Logo height='8vh'/>
            </NavLink>
            {authSelector}
            <div>
                <h2>Forgot Password</h2>
                <p className='text-left'>Enter an email address to get a password reset  link</p>
            </div>
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
    );
};

const mapStateToProps = state => {
    return {
        loading             : state.auth.loading,
        userLoading         : state.auth.userLoading,
        submitted           : state.auth.submitted,
        error               : state.auth.error,
        isLoggedIn          : state.auth.user,
        isAuthenticated     : state.auth.payload,
        authRedirectPath    : state.auth.authRedirectPath,
        token               : state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser             : ()                    => dispatch(),
        onAuth                  : (values, auth, token) => dispatch(),
        onFbAuth                : ()                    => dispatch(),
        onSetAuthRedirectPath   : ()                    => dispatch(),
    };
};

ForgotPassword.propTypes = {
    match : PropTypes.any,
    onAuth : PropTypes.any,
    onFetchUser : PropTypes.any,
    authRedirectPath : PropTypes.any,
    loading : PropTypes.any,
    fetchedUser : PropTypes.any,
    submitted : PropTypes.any,
    userLoading : PropTypes.any,
    token : PropTypes.any,
    isAuthenticated : PropTypes.any,
};

export default connect (mapStateToProps, mapDispatchToProps)(ForgotPassword);