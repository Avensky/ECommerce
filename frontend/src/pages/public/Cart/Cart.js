import React from 'react';
import classes from './Cart.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Cart = (props) => {

    let cart = <p>Cart is empty. So sad</p>;
    if (props.cart.length>0) {
        cart = props.cart.map(item => {
            return <div key={item._id} className={classes.item}>
                <div className={classes.image}><img src={'https://caring-vegan.s3.us-west-2.amazonaws.com/'+item.imageData}/></div>
                <div className={classes.details}>
                    <div>{item.name}</div>
                    <div>{item.desc}</div>
                    <div>Qty:{item.orderAmt}</div>
                    <div>${item.price}</div>
                </div>
            </div>;
        });
    };
  return (
    <div className={['page-wrapper', classes.Cart].join(' ')}>
        <div className='page-title'>Cart</div>
        <div className={classes.CartWrapper}>
            {cart}
        </div>

    </div>
  );
};

const mapStateToProps = state =>{
    return {
        cart: state.shop.cart
    };
};

const mapDispatchToProps = dispatch => {
    return{

    };
};

Cart.propTypes = {
    cart: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);