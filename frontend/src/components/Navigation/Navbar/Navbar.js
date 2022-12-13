import React from 'react';
import classes from './Navbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
//import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ( props ) => {
    return (
        <div className={classes.Navbar}>
            {/* <SidebarToggle clicked={props.sidebarToggleClicked} />  */}
            
            
            
            
            
            {/* <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>

                <i className={['fa fa-bars', classes.SidebarToggle,classes.MobileLinks, classes.Mobile].join(' ')} 
                    onClick={props.sidebarToggleClicked} />

                <div className={[classes.LogoWrapper, classes.Mobile].join(' ')}>
                        <NavLink  to="/">
                            <div className={classes.Logo}>
                                <Logo />
                                <div className={classes.LogoName}>Uriel Zacarias</div>
                            </div>  
                        </NavLink >
                </div>




                <NavLink  to="/">
                    <FontAwesomeIcon icon='fa-user'/>
                </NavLink>
                
            </div>
             */}
       
       
       
       
       
       
       
            {/*  /}
            <div className={[classes.MobileLinks, classes.Mobile].join(' ')}>
                <h2 className="line">
                    {/*props.isLogged !== null
                        ? <div className={classes.NavItem}><a  href="/api/logout">Logout </a></div>
                    : null/}          
                    {props.isLogged !== null
                        ? <NavLink to="/profile">
                            <h2 className={classes.NavItemLogo}><span className={["fa fa-user", classes.user].join(' ')} /></h2>
                        </NavLink>
                        : <NavLink to="/authentication">
                            <h2 className={classes.NavItemLogo}><span className={["fa fa-sign-in", classes.user].join(' ')} /></h2>
                        </NavLink>
                    }                                  
                </h2>
            </div> */}
            
            {/* Desktop Navbar */}
            <div className={classes.Desktop}>
                <NavItems //isLogged={props.isLogged} totalItems={props.totalItems}
                />
            </div>
        </div>
    );
};

Navbar.propTypes = {
    sidebarToggleClicked : PropTypes.bool
};

export default Navbar;
