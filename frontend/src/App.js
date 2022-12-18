import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Shop, Product } from './pages';
//import Navbar from './components/Navigation/Navbar/Navbar';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './redux/actions/index';

const  App = (props) => {

  const getProducts = () => { props.getProducts();};
  const loadCart = () => { props.loadCart(); };
  const loadShop = (orderby) => { props.loadShop(orderby); };

  console.log('products = ', props.products);
  //Get Producs
  useEffect(() => {
    if ( props.products.length === 0 ){ 
        getProducts();
        console.log('get products');
    };
  }, []);

//
//  useEffect(() => {
//    if ( props.products){
//        console.log('Use effect loadCart');
//        loadCart();
//        if (props.products.length>0 && props.addedItems.length>0){
//          console.log('Use effect loadShop items orderby');
//          loadShop(props.orderby);
//      };
//    };
//  }, [props.products]);
//
//  
//  useEffect(() => {
//    if ( props.products){
//      if (props.products.length>0 && props.addedItems.length>0){
//          console.log('Use effect2 load shop items orderby');
//          loadShop(props.orderby);
//      }
//    }
//  }, [props.cartLoaded, props.shopLoaded]);




  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* pages */}
          <Route path="/"                   element={<Home/>}/>
          <Route path="/home"               element={<Home/>}/>
          <Route path="/shop"               element={<Shop />}/>
          <Route path="/product/:id" exact  element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addedItems       : state.shop.addedItems,
    products         : state.shop.products,
    shop             : state.shop.shop,
//    isAuth           : state.auth.payload,
    totalItems       : state.shop.totalItems,
    orderby          : state.shop.orderby,
    cartLoaded       : state.shop.cartLoaded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts         : () =>{ dispatch(actions.getProducts());},
    loadCart            : () =>{ dispatch(actions.loadCart());},
    loadShop            : () =>{ dispatch(actions.loadShop());}
  };
};

App.propTypes = {
  getProducts: PropTypes.func,
  loadCart: PropTypes.func,
  loadShop: PropTypes.func,
  cartLoaded: PropTypes.bool,
  products: PropTypes.array,
  addedItems  : PropTypes.array,
  total       : PropTypes.number,
  orderby:PropTypes.func,
  shopLoaded: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
