import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import classes from'./AuthForm.module.css';

const AuthForm = (props) => {
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

    let initialValues, validationSchema;

    initialValues = {
        email: '', 
        password: '',
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

    let message = false;
    if ( props.message ) {
        message = <p className='color-orange'>{props.message}</p>;
    };

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        enableReinitialize> 
        { formik => 
        <Form>
            {message}
            <div className='flex'>
                <Field type="email" name="email" placeholder="Email Address"className={classes.AuthInput}/>                        
            </div>
            <ErrorMessage className='color-orange'name="email" component="div" />
            <div className='flex'>
                <Field 
                    type={passwordShown ? "text" : "password"}
                    name="password" placeholder="Password" className={classes.AuthInput}
                />
                <FontAwesomeIcon className={classes.eye} icon={passwordShown ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} onClick={togglePasswordVisiblity} />
            </div>
            <ErrorMessage className='color-orange'name="password" component="div" />
            <br />
            <div className='text-right'><NavLink to='/forgotPassword'>Forgot Password?</NavLink></div>
            <br />
            <button  
                className={[classes.Btn, classes.AuthBtn, 'auth-btn' ].join(' ')}
                type='submit'
                disabled={!formik.isValid || formik.isSubmitting }
            >
                <div className={classes.BtnDiv}><span className={['fa fa-sign-in'].join(' ')}></span> Sign In</div>
            </button>
        </Form>}
    </Formik>
  );
};

AuthForm.propTypes ={
    onAuth : PropTypes.func,
    message : PropTypes.any,
    loading : PropTypes.bool,
};

export default AuthForm;