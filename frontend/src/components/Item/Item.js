import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Item.module.css';

//{classes.Thumbnail}

const item = props => {
    const url = 'https://caring-vegan.s3.us-west-2.amazonaws.com/';

    let stock;
    if (props.stock>11){
        stock = <p><b>In Stock:</b> 10+</p>;
    }
    if  ( props.stock < 11 && props.stock > 0 ) {
        stock = <p><b>In Stock:</b> {props.stock}</p>;
    }
    if (props.stock===0){
        stock = <p><b>Out of stock:</b></p>;
    }

//    let rating, star_border, star,star_half //, quantity
//
//    star_border = <i className="material-icons">star_border</i>
//    star = <i className="material-icons">star</i>
//    star_half = <i className="material-icons">star_half</i>
//
//    rating = [star,star,star,star_half,star_border]

    let sold;
        props.sold 
            ? sold = <div className={classes.Sold}><p>Sold: {props.sold}</p></div>
            : sold = null;
    let mystock ;
        props.stock 
            ? mystock = <div className={classes.Stock}>{ stock }</div>
            : mystock = null;

// quantity = (<div className={classes.QuantityWrapper}>
//                 <b><p>Quantity: </p></b>
//                 <div className={classes.Quantity}>
//                     <i className={["material-icons", classes.MaterialIcons, classes.Arrow].join(' ')} 
//                         onClick={props.subtractQuantity}>arrow_drop_down</i>
//                     <p>{props.quantity}</p>
//                     <i className={["material-icons", classes.MaterialIcons, classes.Arrow].join(' ')} 
//                         onClick={props.addToCart}>arrow_drop_up</i>  
//                 </div>
//             </div>)
//    let reviews = <div className={classes.Reviews}>
//        <p className={classes.Title}>{rating} Reviews({props.reviews || 0})</p>
//    </div>

    return  (
    <div className={[classes.Item, props.class].join(' ')} key={props.id}>
            {/* Image */}
            <div className={classes.Thumbnail}>
                <Link to={'/shop/itemfull/' + props.id}>
                    <img className={props.imgClass} src={url+props.image} alt={props.alt}/>
                </Link>
            </div>

        <div className={props.myClass}> 
            {/* Name */}
            <div className={[classes.Name, props.class, 'Name'].join(' ')}>
                <Link to={'/shop/itemfull/' + props.id}>
                    {props.name}
                </Link>
            </div> 

            {/* Description */}
            <div className={[classes.Description, props.class].join(' ')}>
                {props.desc}
            </div>

            {/* Price */}
            <div className={classes.Price}>
                ${props.price.toFixed(2)}
            </div>

            {/* Reviews */}

            {/* Quantity */}
            

            {/* Stock */}
            {mystock}

            {/* Sold */}
            {sold}

            {/* Select */}
            <div className={[classes.SelectWrapper]} /*onClick={props.addToCart}*/>
                <Link to={'/shop/itemfull/' + props.id}>
                    <div className={["text-center noselect", classes.Select].join(' ')}>
                        Select Options
                    </div>
                </Link>
            </div>
        </div>
    </div>
);};
export default item;
