import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
//import { Route, Switch } from 'react-router-dom';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from './Product.module.css';
import * as actions from '../../../redux/actions/index';
//import Details from '../Details/Details';    
// import {useHistory}     from 'react-router-dom';                                                         
//import Item from './ItemDetails/ItemDetails';
// import CheckoutHeader   from '../../Checkout/CheckoutHeader/CheckoutHeader';
import Review from './Review/Review';
import Modal from '../../../components/UI/Modal/Modal';
// import OrderSummary from '../../OrderSummary/OrderSummary';
// import {purchaseContinueHandler} from '../../../../utility/stripe';
import Rating from '../../../components/Rating/Rating';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import PropTypes from 'prop-types';

const Product = props => {
    const id = useParams().id;
    const [item, setItem]   = useState(null);
    const [purchasing, setPurchasing] = useState(false);
    
    const [index, setActiveStep] = useState(0);

    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const history = useHistory();
    
    const handleClick           = (id) => {//props.addToCart(id); 
    };
    const addToCart             = (id) => {//props.addToCart(id);
    };
    const subtractQuantity      = (id) => {//props.subtractQuantity(id);
    };
    const purchaseHandler       = ()   => {setPurchasing(true);};
    const purchaseCancelHandler = ()   => {setPurchasing(false);};
    const viewCartHandler       = ()   => {
        //history.push('/cart');
    };

    useEffect(()=>{
        const getProduct = () => props.getProduct(id);

        //get product if not loaded
        !props.product ? getProduct():null;
        
        console.log('My product = ', props.product);
        //set Item
        setItem(props.product);

    },[props.product]);

    console.log('My product = ', props.product);

    let orderSummary = null;
    // if (props.addedItems) {
    //     orderSummary = <OrderSummary 
    //         items={props.addedItems}
    //         total={props.total}
    //         purchaseCancelled={purchaseCancelHandler}
    //         purchaseContinued={()=>purchaseContinueHandler(props.addedItems, props.isAuth)}
    //     />;
    // }



 
    let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
    
    
    
    if ( item ) {
        details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }
    
    const url = 'https://caring-vegan.s3.us-west-2.amazonaws.com/';
    
    
    // Product Details
    if (props.product) {
        details = <div className={classes.ProductDetails}>
            <div className={classes.ImageWrapper}>
                <ImageSlider collection={props.product.imageData} alt={props.product.name} />
            </div>
            <div className={classes.Options}>

            </div>
            <div className={classes.PriceWrapper}>
                <div className={classes.Price}>{` $${props.product.price.toFixed(2)}`}</div>
            </div>
            <div className={classes.Availability}>
                <div>In Stock: {props.product.quantity || 0}</div>
                <div>Sold: {props.product.sold || 0}</div>
            </div>
            <div className={classes.Button} onClick={addToCart}>
                Add to cart
            </div>
            <div className={classes.Desc}>
                {props.product.desc}
            </div>
        </div>;
    }



let reviews= [
    {
        key: 'lskjd;lfkasd',
        title: 'Great Gift!',
        username: 'poly',
        rating: 3.5,
        date: 'November 30th 2022',
        item: 'be yourself',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
];
    if (reviews){
        reviews = reviews.map((review)=>{
            return (
                <Review 
                    key         = {review._id}
                    title       = {review.title}
                    username    = {review.username}
                    rating      = {review.rating}
                    date        = {review.date}
                    item        = {review.item} 
                    review      = {review.review} 
                />
            );
        });
    };

    let checkout;
    props.totalItems > 0
        ? checkout = purchaseHandler
        : checkout = null;
    console.log('My product = ', props.product);

    return(<>
        <div className={['page-wrapper', classes.Product].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {/* {orderSummary} */}
            </Modal>
            <div className='PageTitle'>
                <a href='/shop'>Shop</a>
            </div>

            <div className={classes.Heading}>
                <div className={classes.Name}>
                    {props.product ? props.product.name : ''}
                </div>
                <div className={classes.Rating}>
                    {props.product 
                        ? <>
                        <Rating rating={props.product.rating}/> 
                        ({props.product.reviewCount || 0})
                        </>
                        : ''}
                </div>
            </div>
                
            {/* <CheckoutHeader
                totalItems={props.totalItems}
                total={props.total}
                viewTitle='View Cart'
                view={viewCartHandler}
                checkout={checkout}
                isAuth={props.isAuth}
            />
             */}
            <div className={classes.Content}>
                {details}
            </div>
        </div>
        <div className={classes.Reviews}>
            <div className={classes.ReviewsHeading}>REVIEWS</div>
                {reviews}
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        product : state.shop.product,
        // items       : state.shop.items,
        // addedItems  : state.shop.addedItems,
        // totalItems  : state.shop.totalItems,
        // total       : state.shop.total,
        // shop        : state.shop.shop,
        // isAuth      : state.auth.payload,
        // cartLoaded  : state.shop.cartLoaded,
        // shopLoaded  : state.shop.shopLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct : (id) => {dispatch( actions.getProduct(id));}
//        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ); },
//        subtractQuantity    : (id)     =>{ dispatch(actions.subtractQuantity(id));}
    };
};

Product.propTypes = {
    product     : PropTypes.object,
    getProduct  : PropTypes.func,
    shop        : PropTypes.array,
    cartLoaded  : PropTypes.array,
    addToCart   : PropTypes.func,
    subtractQuantity: PropTypes.func,
    addedItems  : PropTypes.array,
    total       : PropTypes.number,
    isAuth      : PropTypes.any,
    totalItems  : PropTypes.number,
    reviews      : PropTypes.array,
    review      : PropTypes.string
};

export default connect (mapStateToProps, mapDispatchToProps)(Product);