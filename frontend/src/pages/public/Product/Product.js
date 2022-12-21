import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
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
import ImageGallery from '../../../components/ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

const Product = props => {
    const id = useParams().id;
    const [purchasing, setPurchasing] = useState(false);
    const [index, setActiveStep] = useState(0);

    const goToNextPicture = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const history = useHistory();
    
    const handleClick           = (id) => {//props.addToCart(id); 
    };
    const addToCart             = (id) => {props.addToCart(props.product._id);};
    const subtractQuantity      = (id) => {//props.subtractQuantity(id);
    };
    const purchaseHandler       = ()   => {setPurchasing(true);};
    const purchaseCancelHandler = ()   => {setPurchasing(false);};
    const viewCartHandler       = ()   => {
        //history.push('/cart');
    };
    const getProduct            = (id)   => props.getProduct(id);
    console.log('product = ', props.product);

    useEffect(()=>{
        //get product if not loaded
        if ( !props.product){ 
            getProduct(id);
            console.log('get product');
        };
        
        if (props.product){
            //If Product exists reload
            console.log('check product in memory= ', props.product);
            if (props.product._id !== id){
                getProduct(id);
            };    
        };

    },[props.product]);

//    console.log('My product = ', props.product);

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
    
    
    
    if ( props.loading ) {
        details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }
    
    const url = 'https://caring-vegan.s3.us-west-2.amazonaws.com/';
    
    
    let width = window.innerWidth;
//    console.log('width = ',width);
//    console.log('size = ',props.width);
    // Product Details

    // if (props.loading) {
    //     details=<div>Loading...</div>;
    // };

    if (props.product) {
        details = <div className={classes.Content}>
        <div className={classes.Heading}>
            <div className={classes.Name}>
                {props.product ? props.product.name : ''}
            </div>
            <div className={classes.Rating}>
                <Rating rating={props.product.rating} id= {props.product._id}/>
                 ({props.product.reviewCount || 0})
            </div>

        </div>
        <div className={classes.ProductDetails}>
            <div className={classes.ImageWrapper}>
                <ImageSlider collection={props.product.imageData} alt={props.product.name} />
            </div>
            <div className={classes.DetailsWrapper}>
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
            </div>
        </div>
    </div>;
        if ((props.width >= 1025)||(width >= 1025)){ 
            details = <div className={classes.Content}>
                <div className={classes.ImageWrapper}>
                    <ImageGallery collection={props.product.imageData} alt={props.product.name} />
                </div>
                <div className={classes.ProductDetails}>
                    
                    <div className={classes.Heading}>
                        <div className={classes.Name}>
                            {props.product ? props.product.name : ''}
                        </div>
                     </div>
                     <div className={classes.Heading}>
                        <div className={classes.Rating}>
                            {props.product 
                                ? <>
                                <Rating rating={props.product.rating} id = {props.product._id}/> 
                                ({props.product.reviewCount || 0})
                                </>
                                : ''}
                        </div>
                    </div>        
                    
                    <div className={classes.DetailsWrapper}>
                        <div className={classes.Options}>
        
                        </div>
                        <div className={classes.PriceWrapper}>
                            <div className={classes.Price}>{` $${props.product.price.toFixed(2)}`}</div>
                        </div>
                        <div className={classes.Availability}>
                            <div>In Stock: {props.product.stock || 0}</div>
                            <div>Sold: {props.product.sold || 0}</div>
                        </div>
                        <button className={classes.Button} onClick={addToCart}>
                            Add to cart
                        </button>
                        <div className={classes.Desc}>
                            {props.product.desc}
                        </div>
                    </div>
                </div>
            </div>;
        }      
    }



let reviews= [
    {
        _id: 'lskjd;lfkasd',
        title: 'Great Gift!',
        username: 'poly',
        rating: 3.5,
        date: 'November 30th 2022',
        // item: 'be yourself',
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
];
    if (reviews){
        reviews = reviews.map((review)=>{
            return (
                <Review 
                    key         ={review._id}
                    _id         = {review._id}
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
//    console.log('My product = ', props.product);


    useLayoutEffect(() => {
        window.addEventListener('resize', props.resize);
    
        // You can also use:
        // window.onresize = myHandlerFunction;
      }, []);

    return(<>
        <div className={['page-wrapper', classes.Product].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {/* {orderSummary} */}
            </Modal>
            <div className='PageTitle'>
                <NavLink to='/shop'>Shop</NavLink>
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
            {details}
        </div>
        <div className={classes.Reviews}>
            <div className={classes.ReviewsHeading}>REVIEWS</div>
                {reviews}
        </div>
    </>);
};

const mapStateToProps = state => {
    return {
        product : state.shop.product,
        loading: state.shop.loading,
        width: state.shop.width
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
        getProduct : (id) => {dispatch( actions.getProduct(id));},
        resize     : ()   => {dispatch(actions.resize());},
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ); },
//        subtractQuantity    : (id)     =>{ dispatch(actions.subtractQuantity(id));}
    };
};

Product.propTypes = {
    width       : PropTypes.number,
    resize      : PropTypes.func,
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
    reviews     : PropTypes.array,
    review      : PropTypes.string,
    loading     : PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);