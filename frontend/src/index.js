import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
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
  faStarHalf,
  faStarHalfStroke,
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
faStarHalf,
faStarHalfStroke,
faTrashCan,
faPlus,
faMinus,
faEye,
faEyeSlash,
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
//  </React.StrictMode>
);