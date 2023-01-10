import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faStar as faStarBorder,
  faStarHalfStroke
} from '@fortawesome/free-regular-svg-icons';

import { 
  fab, 
  faFacebook,
  faGooglePlus
} from '@fortawesome/free-brands-svg-icons';

import { 
  faCheckSquare, 
  faCoffee,
  faUser,
  faCartShopping,
  //faBagShopping,
  faMagnifyingGlass,
  faHeart,
  faBars,
  faStar,
  faTrashCan,
  faMinus,
  faPlus,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faCheckSquare, faCoffee, faUser,
faCartShopping,
//faBagShopping,
faMagnifyingGlass,
faHeart,
faBars,
faStar,
faStarHalfStroke,
faStarBorder,
faTrashCan,
faPlus,
faMinus,
faEye,
faEyeSlash,
faFacebook,
faGooglePlus
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
//  </React.StrictMode>
);