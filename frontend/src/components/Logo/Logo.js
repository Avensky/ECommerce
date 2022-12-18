import React from 'react';
import myLogo from '../../assets/images/logo.svg';
import classes from './Logo.module.css';
import PropTypes from 'prop-types';

const Logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={myLogo} alt="Logo" />
    </div>
);

Logo.propTypes={
    height: PropTypes.string
};

export default Logo;