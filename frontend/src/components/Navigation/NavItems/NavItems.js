import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
import Logo from '../../Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const NavItems = ( props ) => (
    <div className={classes.Desktop}>
        <ul className={classes.NavItems}>
            <NavItem to="/home" exact='true'><Logo />ECommerce</NavItem >
            <NavItem to="/shop" exact='true'>Shop</NavItem>
            <NavItem to="/about" exact='true'>About</NavItem>
            <NavItem to="/recipes" exact='true'>Recipes</NavItem>
        </ul>
        <ul className={classes.NavItems}>
            <NavItem to="/support" exact='true'>Support</NavItem>
            {/* {props.isLogged != null 
                ? <NavItem to="/profile"          >Profile</NavItem> 
                : null}
            {props.isLogged != null 
                ? <NavItem to="/orders"          >Orders</NavItem> 
                : null}

            {props.isLogged != null 
                ? <NavItem to="/profile"          >Profile</NavItem> 
                : null} */}
            {!props.isLogged
                ? <NavItem to="/authentication" exact='true'>
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                </NavItem>
                : <div className={classes.NavItem}><a  href="/api/logout">Logout</a></div>}
        
            <NavItem to="/search" exact='true'>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </NavItem>
            <NavItem to="/cart" exact='true'>
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </NavItem>
        </ul>
    </div>

);

NavItems.propTypes = {
    isLogged : PropTypes.any
};

export default NavItems;
