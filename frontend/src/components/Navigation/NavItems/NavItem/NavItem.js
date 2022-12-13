import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';
import PropTypes from 'prop-types';

const NavItem = ( props ) => (
    <li className={classes.NavItem}>
            <NavLink 
                to={props.to}
                exact={props.exact}
                className={navData =>
                    (navData.isActive ? classes.active : "")
                  }
                >{props.children}
            </NavLink>

    </li>
);

NavItem.propTypes = {
    to : PropTypes.string,
    exact : PropTypes.bool,
    children : PropTypes.any
};

export default NavItem;
