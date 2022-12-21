import React from 'react';
import classes from './Cart.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = (props) => {
    // define functions
    const addToCart = async id => await props.addToCart(id);
    const subtractFromCart = async id => await props.subtractFromCart(id);
    const removeFromCart = async id => await props.removeFromCart(id);

    let cart = <p>Cart is empty. So sad</p>;
    if (props.cart.length>0) {
        cart = props.cart.map(item => {
            console.log('item._id', item._id);
            return <div key={item._id} className={classes.Item}>
                {/* Item Data */}
                <div className={classes.ItemData} >
                    {/* Remove Item*/}
                    <div className={classes.Remove} onClick={()=>removeFromCart(item._id)}>
                        <FontAwesomeIcon icon='fa-solid fa-trash-can' />
                    </div>

                    {/* Image */}
                        <NavLink to={'/product/' + item._id} className={classes.ImageWrapper}>
                            <img src={'https://caring-vegan.s3.us-west-2.amazonaws.com/'+item.imageData} alt={item.alt}/>
                        </NavLink>
                    
                    {/* Details */}
                    <div className={classes.Details}>
                        {/* Name */}
                        <div className={classes.Name}>{item.name}</div>
                        {/* Description */}
                        <div className={classes.Description}>{item.desc}</div>
                    </div>
                </div>

                {/* Pricing section */}
                <div className={classes.Pricing}>
                    {/* Price */}
                    <div className={classes.Price}>
                        Price ${item.price}
                    </div>

                    {/* Quantity */}
                    <div className={classes.QuantityWrapper}>
                        <div className={classes.QuantityLabel}>
                            Qty:
                        </div>
                        <div className={classes.Quantity}>
                            <div className={classes.QuantityModifier} onClick={()=>subtractFromCart(item._id)}>
                                <FontAwesomeIcon icon='fa-solid fa-minus' />
                            </div>
                            <div className={classes.QuantityAmount}>{item.orderAmt}</div>
                            <div className={classes.QuantityModifier} onClick={()=>addToCart(item._id)}>
                                <FontAwesomeIcon icon='fa-solid fa-plus' />
                            </div>                                   
                        </div>
                    </div>

                    {/* Price */}
                    <div className={classes.ItemTotal}>
                        Total ${item.price * item.orderAmt}
                    </div>
                </div>
            </div>;
        });
    };

    let orderSummary = <></>;

    props.cart.length>0 
        ? orderSummary = (<div className={classes.OrderSummary}>
        <div className={classes.OrderDetails}>
            <div className={classes.OrderDetailsSection}>
                <div className={classes.SubtotalLabel}>Subtotal</div>
                <div className={classes.SubTotal}>${props.totalPrice}</div>
            </div>
            <div className={classes.OrderDetailsSection}>
                <div className={classes.ShippingLabel}>Shipping</div>
                <div className={classes.Shipping}></div>
            </div>
            <div className={classes.OrderDetailsTotal}>
                <div className={classes.TotalLabel}>TOTAL(USD)</div>
                <div className={classes.Total}>${props.totalPrice}</div>
            </div>
            <div className={classes.Checkout} >
                CHECKOUT
            </div>
        </div>
    </div>)
    : null;
  return (
    <div className={['page-wrapper', classes.Cart].join(' ')}>
        <div className='page-title'>Cart</div>
        <div className={classes.CartWrapper}>
            {cart}
        </div>
        <div className={classes.Bar}></div>
        {orderSummary}
    </div>
  );
};

const mapStateToProps = state =>{
    return {
        cart: state.shop.cart,
        totalPrice: state.shop.totalPrice,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        addToCart           : (id) => {dispatch(actions.addToCart(id));},
        subtractFromCart    : (id) => {dispatch(actions.subtractFromCart(id));},
        removeFromCart          : (id) => {dispatch(actions.removeFromCart(id));},
    };
};

Cart.propTypes = {
    cart: PropTypes.array,
    addToCart: PropTypes.func,
    subtractFromCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    totalPrice: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);