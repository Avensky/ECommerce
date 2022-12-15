import React, {useEffect, useLayoutEffect} from 'react';
import { connect }      from 'react-redux';
import classes from './Home.module.css';
import * as actions     from '../../../redux/actions/index';
import myImg from '../../../assets/images/background.jpg';
import Item from '../../../components/Item/Item';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = (props) => {
    const addToCart             = (id) => {};
    //const addToCart             = (id) => {props.addToCart(id)}
    const subtractQuantity      = (id) => {};
    //const subtractQuantity      = (id) => {props.subtractQuantity(id);}

//    let shop = props.shop.filter(item => item.featured === '1')
    let shop = props.products.filter(item => item.featured === '1');
    let featured = shop.map( item => {
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
    });

    useEffect(()=>{
        console.log('useeffect');
        const getProducts = async () => props.getProducts();
        //if (!props.products){
        if (props.products.length === 0){
            getProducts();
        }
        console.log('products: ', props.products);
    },[props.products]);

    return(
    <div className={classes.Home}>
        {/* Mission statement and shop link */}
        <div className={classes.MissionContainer}>
            <div className={classes.MissionHeading}>
                FOR PEOPLE WITH CARING HEARTS <FontAwesomeIcon icon='fa-heart' />
            </div>
            <div className={classes.MissionDescription}>
                With cute stickers and products we hope to spread our message of 
                love towards all. Specially those with furry paws.
            </div>
            <div className={classes.MissionButton}>
                <NavLink to="/shop" className={classes.moduleLink}>Shop Now</NavLink>
            </div>
        </div>
        {/* Main Image */}
        <div className={classes.ImageContainer}>
            <img src={myImg} alt="Main Background"/>
        </div>
        {/* Statement */}
        <div className={classes.Statement}>
            Change the world with caring hearts <FontAwesomeIcon icon="fa-heart" />
        </div>
        {/* Featured Section */}
        <div className={classes.Featured}> 
            <div className={classes.FeaturedTitle}>
                <h1>Featured Products</h1>
            </div>
            <div className={classes.FeaturedContent}>
                {featured}
            </div>
        </div>
    </div>
    );
};

const mapStateToProps = state => {
    return {
  //      addedItems  : state.shop.addedItems,
  //      totalItems  : state.shop.totalItems,
        products       : state.shop.products,
  //      total       : state.shop.total,
  //      shop        : state.shop.shop,
  //      isAuth      : state.auth.payload
    };
};

const mapDispatchToProps = dispatch => {
    return {
//        addToCart           : (id)   =>{ dispatch(actions.addToCart(id))},
        getProducts            : ()     =>{ dispatch(actions.getProducts());},
//        loadCart            : (cart) =>{ dispatch(actions.loadCart(cart))},
//        loadShop            : (cart) =>{ dispatch(actions.loadShop(cart))},
//        getItemByType       : (type) =>{ dispatch(actions.getItemByType(type))},
//        orderBy             : (type) =>{ dispatch(actions.orderBy(type))},
//        subtractQuantity    : (id)   =>{ dispatch(actions.subtractQuantity(id))}
    };
};

Home.propTypes = {
    products: PropTypes.array,
    getProducts: PropTypes.func
};

export default connect (mapStateToProps, mapDispatchToProps)(Home);