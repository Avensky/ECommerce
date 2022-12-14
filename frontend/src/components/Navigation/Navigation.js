import React, {useState} from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const Navigation = (props) => {
    // Toggle sidebar view
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarToggleHandler          = () => {setShowSidebar(!showSidebar);};
    const closeSidebarHandler           = () => {setShowSidebar(false);};
  return (
    <div>
        <Navbar 
            //isLogged                = {props.isLoggedIn}
            sidebarToggleClicked    = {sidebarToggleHandler} 
        />
        <Sidebar 
            //isLogged                = {props.isLoggedIn}
            open                    = {showSidebar} 
            closed                  = {closeSidebarHandler} 
        />
    </div>
  );
};

export default Navigation;