import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Shop, Product, Cart, Login, Register, ForgotPassword, ResetPassword } from './pages';
//import Navbar from './components/Navigation/Navbar/Navbar';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions/index';

const  App = (props) => {

  const getProducts = () => { props.getProducts();};
  const loadCart    = async() => { await props.loadCart(); };
  // const loadShop    = (orderby) => { props.loadShop(orderby); };
  const checkout    = () => { props.checkout(props.cart); };
  const getUser = async () => { props.getUser(); };
  const logout = async () => { props.logout(); };

  console.log('products = ', props.products);
  //Get Producs
  useEffect(() => {
    if ( props.products.length === 0 ){ 
        getProducts();
        console.log('get products');
    };
  }, []);

  useEffect(()=>{
    console.log('load cart');
    loadCart();
  },[]);

  useEffect(()=> { 
    if ( !props.user){getUser();};
  }, [props.user]);

//
//  useEffect(() => {
//    if ( props.products){
//        console.log('Use effect loadCart');
//        loadCart();
//        if (props.products.length>0 && props.cart.length>0){
//          console.log('Use effect loadShop items orderby');
//          loadShop(props.orderby);
//      };
//    };
//  }, [props.products]);
//
//  
//  useEffect(() => {
//    if ( props.products){
//      if (props.products.length>0 && props.cart.length>0){
//          console.log('Use effect2 load shop items orderby');
//          loadShop(props.orderby);
//      }
//    }
//  }, [props.cartLoaded, props.shopLoaded]);




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
          <Route path="/resetPassword/:token" exact element={<ResetPassword />} 
          />
          {/* pages */}
          <Route path="/"                           element={<Home/>}/>
          <Route path="/home"                       element={<Home/>}/>
          <Route path="/shop"                       element={<Shop />}/>
          <Route path="/product/:id"          exact element={<Product />} />
          <Route path="/cart"                 exact element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart       : state.shop.cart,
    products         : state.shop.products,
    shop             : state.shop.shop,
    user             : state.auth.user,
    totalItems       : state.shop.totalItems,
    orderby          : state.shop.orderby,
    cartLoaded       : state.shop.cartLoaded
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
  loadShop: PropTypes.func,
  cartLoaded: PropTypes.bool,
  products: PropTypes.array,
  cart  : PropTypes.array,
  total       : PropTypes.number,
  orderby:PropTypes.func,
  shopLoaded: PropTypes.func,
  totalItems: PropTypes.number,
  checkout: PropTypes.func,
  user: PropTypes.object,
  getUser: PropTypes.func,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
