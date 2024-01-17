import React, { useState }  from 'react';
import { connect }          from 'react-redux';
import classes              from './Shop.module.css';
import Item                 from '../../../components/Item/Item';
import * as actions         from '../../../redux/actions/index';
import PropTypes            from 'prop-types';

const Shop = props => { 
    // Set default sort type
    const [sortType, setSortType] = useState('Featured');
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


//    console.log(props.isAuth);
    let newitem;
    // if (props.isAuth){
    //     props.isAuth.role === 'admin' 
    //     ? newitem = <NewItem />
    //     : newitem = null;
    // }



    return(
        <div className={['page-wrapper', classes.Shop].join(' ')}>

            {/* Title */}
            <div className={classes.ShopTitle}>SHOP ALL</div>

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
                            images              = {item.images}
                            key                 = {item._id}
                            id                  = {item._id}
                            alt                 = {item.title}
                            title               = {item.title}
                            link                = {"/product"}
                            to                  = "/"
                            clicked             = {() => addToCart(item._id)}
                            addToCart           = {() => addToCart(item._id)}
                            subtractQuantity    = {() => subtractQuantity(item._id)}
                            name                = {item.name}
                            desc                = {item.desc}
                            price               = {item.default_price.unit_amount/100}
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
        products       : state.shop.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts            : ()     =>{ dispatch(actions.getProducts());},
        // orderBy             : (type) =>{ dispatch(actions.orderBy(type))},
    };
};

Shop.propTypes = {
    totalItems: PropTypes.number,
    getItems: PropTypes.func,
    getItemByType: PropTypes.func,
    products: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);