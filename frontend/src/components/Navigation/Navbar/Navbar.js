import React, {useState} from 'react';
import classes from './Navbar.module.css';
import Logo from '../../Logo/Logo';
//import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ( props ) => {

    return (
        <div className={classes.NavbarWrapper}>
            {/* Mobile Sidebar */}
            <div className={[classes.Navbar, classes.Mobile].join(' ')}>
                <div className={classes.NavItems}>
                    <FontAwesomeIcon icon='fa-solid fa-bars' onClick={props.sidebarToggleClicked} className={classes.Bars}/>
                </div>
                <div className={classes.NavItems}>
                    <NavLink to="/home" exact='true' className={classes.LogoWrapper}>
                            <Logo height='80%' />
                            <div className={classes.LogoText}>ECOMMERCE</div>
                    </NavLink >
                </div>
                <div className={classes.NavItems}>
                    <NavItem to="/authentication" exact='true'>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                    </NavItem>
                    <div className={classes.Cart} onClick={props.cartbarToggleClicked}>
                        <div className={classes.TotalItems}>{props.totalItems}</div>
                        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                    </div>
                </div>

            </div>
            {/* Desktop Navbar */}                             
            <div className={[classes.Navbar, classes.Desktop].join(' ')}>
                <div className={classes.NavItems}>
                    <FontAwesomeIcon icon='fa-solid fa-bars' onClick={props.sidebarToggleClicked} className={classes.Bars}/>
                    <NavLink to="/home"     exact='true'>
                        <div className={classes.LogoWrapper}>
                            <Logo height='80%' />
                            <div className={classes.LogoText}>ECOMMERCE</div>    
                        </div>
                    </NavLink >
                    <NavItem to="/shop"     exact='true'>Shop</NavItem>
                    <NavItem to="/about"    exact='true'>About</NavItem>
                    <NavItem to="/recipes"  exact='true'>Recipes</NavItem>
                </div>
                <div className={classes.NavItems}>
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
                            <FontAwesomeIcon icon="fa-solid fa-user"/>
                        </NavItem>
                        : <div className={classes.NavItem}><a  href="/api/logout">Logout</a></div>}
                
                    <NavItem to="/search" exact='true'>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </NavItem>

                    <NavItem exact='true' onClick={props.cartbarToggleClicked} className='none'>
                        <div className={classes.TotalItems}>{props.totalItems}</div>
                        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                    </NavItem>
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    sidebarToggleClicked : PropTypes.func,
    cartbarToggleClicked : PropTypes.func,
    isLogged : PropTypes.any,
    totalItems: PropTypes.number
};

export default Navbar;
