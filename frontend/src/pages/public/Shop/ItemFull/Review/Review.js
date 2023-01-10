import React from 'react';
import classes from './Review.module.css';
import PropTypes from 'prop-types';
import Rating
 from '../../../../../components/Rating/Rating';
const Review = props => {
    let rating, star_border, star,star_half, quantity;

    star_border = <i className="material-icons">star_border</i>;
    star = <i className="material-icons">star</i>;
    star_half = <i className="material-icons">star_half</i>;

    let key = props.rating;
    console.log('rating ', key);


    let review = (
        <div className={classes.Reviews}>
            <div className={classes.username}>
                <b>{props.username}</b>
            </div>
            <div className={classes.rating}>
                <p><Rating rating={key} /></p>
            </div>
            <div className={classes.date}>
                <p>{props.date}</p>
            </div>
            <div className={classes.item}>
                <b>{props.item}</b>
            </div>
            <div className={classes.review}>
                <p>{props.review}</p>
            </div>
        </div>
    );
    return (
        review
    );
};

Review.propTypes = {
    rating: PropTypes.number,
    username: PropTypes.string,
    date: PropTypes.string,
    item: PropTypes.object,
    review: PropTypes.string
};

export default Review;