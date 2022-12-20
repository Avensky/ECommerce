import React, {useState} from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import PropTypes from 'prop-types';
import CartBar from './CartBar/CartBar';

const Navigation = (props) => {
    // Toggle sidebar view
    const [showSidebar, setShowSidebar] = useState(false);
    const [showCartbar, setShowCartbar] = useState(false);
    
    const sidebarToggleHandler          = () => {
      setShowSidebar(!showSidebar);
      setShowCartbar(false);
    };
    const closeSidebarHandler           = () => {setShowSidebar(false);};

    const cartbarToggleHandler          = () => {
      setShowCartbar(!showCartbar);
      setShowSidebar(false);
    };
    const closeCartbarHandler           = () => {setShowCartbar(false);};

    return (
    <div>
        <Navbar 
            //isLogged                = {props.isLoggedIn}
            sidebarToggleClicked    = {sidebarToggleHandler} 
            cartbarToggleClicked    = {cartbarToggleHandler}
            totalItems              = {props.totalItems}
        />
        <Sidebar 
            //isLogged                = {props.isLoggedIn}
            open                    = {showSidebar} 
            closed                  = {closeSidebarHandler} 
        />
        <CartBar
            open = {showCartbar}
            closed = {closeCartbarHandler}
            marginTop = "51px"
            cart = {props.cart}
        />
    </div>
  );
};

Navigation.propTypes = {
  totalItems : PropTypes.number,
  cart: PropTypes.array
};

export default Navigation;