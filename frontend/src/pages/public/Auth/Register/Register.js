import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import classes from './Register.module.css';
import * as actions from '../../../../redux/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { NavLink, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../../../components/Logo/Logo';
import PropTypes from 'prop-types';
import AuthNav from '../AuthNav/AuthNav';
import SocialAuth from '../SocialAuth/SocialAuth';

const Register = props => {
    const [passwordComfirmShown, setPasswordComfirmShown] = useState(false);    
    const togglePasswordComfirmVisiblity = () => {setPasswordComfirmShown(passwordComfirmShown ? false : true);};
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {setPasswordShown(passwordShown ? false : true);};

    const submitHandler = ( values, submitProps ) => {
        //console.log('Form data', values)
        //console.log('submitProps', submitProps`)
        const auth ='register';
        props.onAuth( values, auth);
        submitProps.setSubmitting(false);
        submitProps.resetForm();
    };

    let initialValues, validationSchema, selected, unselected, form, button, authSelector, socialAuth, loader;

initialValues = {
    email: '', 
    password: '',
    confirm_password: ''
};
validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
    password: Yup.string()
        .min(8, "Minimum 8 characters")
        .max(15, "Maximum 15 characters")
        .required("Password is required!")  
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),                       
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords  must match")
        .required("Password confirm is required!")
});

props.loading || props.submitted && props.userLoading
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
    <div className='flex'>
        <Field 
            type={passwordComfirmShown ? "text" : "password"}
            name="confirm_password" 
            placeholder="Confirm Password"
            className={classes.AuthInput}
        /><span className={passwordComfirmShown ? "fa fa-eye-slash" : "fa fa-eye"} onClick={togglePasswordComfirmVisiblity} ></span>
    </div>
    <ErrorMessage className='color-orange'name="confirm_password" component="div" />              
</>;
button = <div className={classes.BtnDiv}><span className={['fa fa-user'].join(' ')}></span>Sign Up</div>;

let message = false;
if ( props.message ) {
    message = <p className='color-orange'>{props.message}</p>;
};

return(
    <div className='page-wrapper'>
        {props.user?  <Navigate to='/'/>:null}
        <div className={classes.Auth} >
            <NavLink to='/home'>
                <Logo height='8vh'/>
            </NavLink>
            <AuthNav style='register'/>
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
        message               : state.auth.message
    };
};

const mapDispatchToProps = dispatch => {
    return {
//        onFetchUser             : ()                    => dispatch(),
        onAuth                  : (values, auth, token) => dispatch(actions.auth(values,auth,token)),
//        onFbAuth                : ()                    => dispatch(),
//        onSetAuthRedirectPath   : ()                    => dispatch(),
    };
};


Register.propTypes = {
    match : PropTypes.any,
    onAuth : PropTypes.any,
    onFetchUser : PropTypes.any,
    authRedirectPath : PropTypes.any,
    loading : PropTypes.any,
    fetchedUser : PropTypes.any,
    submitted : PropTypes.any,
    userLoading : PropTypes.any,
    message : PropTypes.any,
    user : PropTypes.any,
};

export default connect (mapStateToProps, mapDispatchToProps)(Register);
