import React, { useState, useEffect }  from 'react';
import { connect }          from 'react-redux';
import classes              from './Shop.module.css';
import Item                 from '../../../components/Item/Item';
import * as actions         from '../../../redux/actions/index';
//import {useHistory}         from 'react-router-dom';
//import CheckoutHeader       from '../Checkout/CheckoutHeader/CheckoutHeader';
//import OrderSummary         from '../OrderSummary/OrderSummary';
import Modal                from '../../../components/UI/Modal/Modal';
import { loadStripe }       from '@stripe/stripe-js';
//import Dropdown             from 'react-dropdown';
//import NewItem              from './NewItem/NewItem';
import keys                 from '../../../config/keys';
import PropTypes            from 'prop-types';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
console.log('stipe key');
let stripePromise = loadStripe(keys.stripePublishableKey);

const Shop = props => { 
    // Set default sort type
    const [sortType, setSortType] = useState('Featured');

    const purchaseContinueHandler = async (addedItems, isAuth, event) => {
        console.log('checkout start');        // Get Stripe.js instance
        const stripe = await stripePromise;
        console.log('stripePromise');   
        let line_items = addedItems.map( item => {
            let data = {
                price       : item.priceid,
                quantity    : item.amount,
                tax_rates   : [keys.taxRates]
            };
             console.log('data = '+JSON.stringify(data));
            return data;
        });
        
        let body; 
        isAuth 
        ? body = JSON.stringify({items: line_items,userid: isAuth['_id']})
        : body = JSON.stringify({items: line_items});
        // Call your backend to create the Checkout Session
        const response = await fetch('/api/checkout', { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    
            //make sure to serialize your JSON body
            body
        });
    
        const session = await response.json();
        console.log(session);
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({sessionId: session.id,});
    
        if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        console.log(result.error.message);
        }
    };
    
    const [purchasing, setPurchasing] = useState(false);
    //const history = useHistory()

    const addToCart             = (id) => {//props.addToCart(id);
    };
    const subtractQuantity      = (id) => {//props.subtractQuantity(id);
    };
    const purchaseHandler       = ()   => {setPurchasing(true);
    };
    const purchaseCancelHandler = ()   => {setPurchasing(false);
    };
    const viewCartHandler       = ()   => {//history.push('/cart')
    };


    useEffect(()=>{
        console.log('useeffect');
        const getProducts = async () => props.getProducts();
        //if (!props.products){
        if (props.products.length === 0){
            getProducts();
        }
        console.log('products: ', props.products);
    },[props.products]);

    

    let orderSummary = null;
    // if (props.addedItems) {
    //     orderSummary = <OrderSummary 
    //         items={props.addedItems}
    //         total={props.total}
    //         purchaseCancelled={purchaseCancelHandler}
    //         purchaseContinued={() => purchaseContinueHandler(props.addedItems, props.isAuth)}
    //     />;
    // }

    let checkout;
    props.totalItems > 0
        ? checkout = purchaseHandler
        : checkout = null;

    const sortOptions = ['featured', 'newest', 'bestselling', 'alphaasc', 'alphadesc', 
        'avgcustomerreview', 'priceasc', 'pricedesc'];


    const shopNav = (<div className={classes.ShopNav}>
        <a className={classes.ShopNavLink} href="#all"      ><div className={classes.ShopNavItem} id="#all"      onClick={()=> props.getItems()}                >All      </div></a>
        <a className={classes.ShopNavLink} href="#hat"      ><div className={classes.ShopNavItem} id="#apparel"  onClick={()=> props.getItemByType('hat')}      >Apparel  </div></a>
        <a className={classes.ShopNavLink} href="#shirt"    ><div className={classes.ShopNavItem} id="#gifts"    onClick={()=> props.getItemByType('shirt')}    >Gifts    </div></a>
        <a className={classes.ShopNavLink} href="#stickers" ><div className={classes.ShopNavItem} id="#stickers" onClick={()=> props.getItemByType('stickers')} >Stickers </div></a>
        <a className={classes.ShopNavLink} href="#mug"      ><div className={classes.ShopNavItem} id="#mug"      onClick={()=> props.getItemByType('mug')}      >Mugs     </div></a>
    </div>);
    // Sort Dropdown
    const sort = (<div className={classes.SortWrapper}>
        <div className={classes.SortTitle}>
            SORT: 
        </div> 
        <select className={classes.Sort}>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>FEATURED ITEMS</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>NEWEST ITEMS</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>BEST SELLING</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>A TO Z</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>Z TO A</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>BY REVIEW</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>PRICE LOW TO HIGH</option>
            <option className={classes.Option} onChange={(e)=> setSortType(e.targetValue)}>PRICE HIGH TO LOW</option>
        </select>
    </div>);


    console.log(props.isAuth);
    let newitem;
    // if (props.isAuth){
    //     props.isAuth.role === 'admin' 
    //     ? newitem = <NewItem />
    //     : newitem = null;
    // }



    return(
        <div className={['page-wrapper', classes.Shop].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {orderSummary}
            </Modal>

            {/* Title */}
            <div className={classes.ShopTitle}>SHOP ALL</div>

            {/* <CheckoutHeader
                totalItems={props.totalItems}
                total={props.total}
                viewTitle='View Cart'
                view={viewCartHandler}
                checkout={purchaseHandler}
                isAuth={props.isAuth}
            /> */}

            {/* Shop Bar */}
            <div className={classes.ShopBar}>
                {/* Shop Nav */}
                {shopNav}
                {/* Shop Sort */}
                {sort}
            </div>



            {/* {newitem} */}
            <div className={classes.ShopContent}>
                {/* {props.shop.map( item => { */}
                {props.products.map( item => {
                    return( 
                        <Item
                            image               = {item.imageData}
                            key                 = {item._id}
                            id                  = {item._id}
                            alt                 = {item.title}
                            title               = {item.title}
                            link                = {"/shop/"}
                            to                  = "/"
                            clicked             = {() => addToCart(item._id)}
                            addToCart           = {() => addToCart(item._id)}
                            subtractQuantity    = {() => subtractQuantity(item._id)}
                            name                = {item.name}
                            desc                = {item.desc}
                            price               = {item.price}
                            quantity            = {item.amount | 0}
                            add                 = {true}
                        />
                    );
                })}

                {props.totalItems > 0
                    ?  (<button 
                            className='btn-primary btn'
                            type="button" role="link"
                            onClick={purchaseHandler}>CONTINUE TO CHECKOUT</button>)
                    : null
                }
            </div>
        </div>
    );
}; 

const mapStateToProps = state => {
    return {
        // addedItems  : state.shop.addedItems,
        // totalItems  : state.shop.totalItems,
        // items       : state.shop.items,
        // total       : state.shop.total,
        // shop        : state.shop.shop,
        // isAuth      : state.auth.payload
        products       : state.shop.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts            : ()     =>{ dispatch(actions.getProducts());},
        // addToCart           : (id)   =>{ dispatch(actions.addToCart(id))},
        // getItems            : ()     =>{ dispatch(actions.getItems())},
        // getItemByType       : (type) =>{ dispatch(actions.getItemByType(type))},
        // loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
        // loadShop            : (cart) =>{ dispatch(actions.loadShop(cart))},
        // orderBy             : (type) =>{ dispatch(actions.orderBy(type))},
        // subtractQuantity    : (id)   =>{ dispatch(actions.subtractQuantity(id))}
    };
};

Shop.propTypes = {
    totalItems: PropTypes.number,
    isAuth: PropTypes.any,
    getItems: PropTypes.func,
    getItemByType: PropTypes.func,
    loadShop: PropTypes.func,
    shop: PropTypes.array,
    products: PropTypes.array,
    getProducts: PropTypes.func
};

export default connect (mapStateToProps, mapDispatchToProps)(Shop);