import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import classes from './Product.module.css';
import * as actions from '../../../redux/actions/index';
import Review from './Review/Review';
import Modal from '../../../components/UI/Modal/Modal';
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
 
    let details = <p style={{textAlign: 'center'}}>Please select an item!</p>;
    
    if ( props.loading ) {
        details = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }
    
    const url = 'https://caring-vegan.s3.us-west-2.amazonaws.com/';
    
    let width = window.innerWidth;
//    console.log('width = ',width);
//    console.log('size = ',props.width);

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
            {props.product.images ? <div className={classes.ImageWrapper}>
                <ImageSlider collection={props.product.images} alt={props.product.name} />
            </div>
            
            :null}
            

            <div className={classes.DetailsWrapper}>
                <div className={classes.Options}>

                </div>

                {props.product.default_price.unit_amount 
                ? <div className={classes.PriceWrapper}>
                    <div className={classes.Price}>{` $${props.product.default_price.unit_amount.toFixed(2)}`}</div>
                </div>
                
                : null}
               
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
        if ((props.width >= 1025)||(width >= 1025) && props.product.images){ 
            details = <div className={classes.Content}>
                <div className={classes.ImageWrapper}>
                    <ImageGallery collection={props.product.images} alt={props.product.name} />
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
                        {props.product.default_price.unit_amount 
                        ? <div className={classes.PriceWrapper}>
                            <div className={classes.Price}>{` $${props.product.default_price.unit_amount.toFixed(2)}`}</div>
                        </div>
                        : null}
                        

                        <div className={classes.Availability}>
                            <div>In Stock: {props.product.stock || 0}</div>
                            <div>Sold: {props.product.sold || 0}</div>
                        </div>
                        <button type='button' className={classes.Button} onClick={addToCart}>
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

    useLayoutEffect(() => {
        window.addEventListener('resize', props.resize);
      }, []);

    return(<>
        <div className={['page-wrapper', classes.Product].join(' ')}>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}> 
                {/* {orderSummary} */}
            </Modal>
            <div className='PageTitle'>
                <NavLink to='/shop'>Shop</NavLink>
            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct : (id) => {dispatch( actions.getProduct(id));},
        resize     : ()   => {dispatch(actions.resize());},
        addToCart: ( id ) => { dispatch( actions.addToCart( id ) ); },
    };
};

Product.propTypes = {
    width       : PropTypes.number,
    resize      : PropTypes.func,
    product     : PropTypes.object,
    getProduct  : PropTypes.func,
    addToCart   : PropTypes.func,
    total       : PropTypes.number,
    totalItems  : PropTypes.number,
    loading     : PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);