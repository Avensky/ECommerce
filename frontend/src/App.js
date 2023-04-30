import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Shop, Product, Cart, Login, Register, ForgotPassword, ResetPassword } from './pages';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions/index';

const  App = (props) => {  
  const getProducts = () => { props.getProducts();};
  const loadCart    = async() => { await props.loadCart(); };
  const checkout    = () => { props.checkout(props.cart); };
  const getUser     = async () => { await props.getUser(); };
  const logout      = async () => { await props.logout(); };

  //Get Producs
  useEffect(() => {
    if ( props.products.length === 0 ){ 
        getProducts();
    };
  }, []);

  useEffect(()=>{
    loadCart();
  },[]);

  useEffect(()=> { 
    if ( !props.user){getUser();};
  }, [props.user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation totalItems={props.totalItems} cart={props.cart} checkout={checkout}
        user={props.user} logout={logout}/>
        <Routes>

          {/* authentication */}
          <Route path="/login"                      element={<Login/>} />
          <Route path="/register"                   element={<Register/>} />
          <Route path="/forgotPassword"             element={<ForgotPassword/>} />
          <Route path="/resetPassword"              element={<ResetPassword/>} />
          <Route path="/resetPassword/:token" exact element={<ResetPassword />} />

          {/* pages */}
          <Route path="/"                           element={<Home/>}/>
          <Route path="/home"                       element={<Home/>}/>
          <Route path="/shop"                 exact element={<Shop />}/>
          <Route path="/product/:id"          exact element={<Product />} />
          <Route path="/cart"                 exact element={<Cart />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart             : state.shop.cart,
    products         : state.shop.products,
    user             : state.auth.user,
    totalItems       : state.shop.totalItems,
    orderby          : state.shop.orderby,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser             : () => { dispatch(actions.getUser());},
    getProducts         : () =>{ dispatch(actions.getProducts());},
    loadCart            : () =>{ dispatch(actions.loadCart());},
    loadShop            : () =>{ dispatch(actions.loadShop());},
    checkout            : (cart, user) =>{ dispatch(actions.checkout(cart, user));},
    logout              : () =>{dispatch(actions.logout());},
  };
};

App.propTypes = {
  getProducts: PropTypes.func,
  loadCart: PropTypes.func,
  products: PropTypes.array,
  cart  : PropTypes.array,
  orderby:PropTypes.func,
  totalItems: PropTypes.number,
  checkout: PropTypes.func,
  user: PropTypes.any,
  getUser: PropTypes.func,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
