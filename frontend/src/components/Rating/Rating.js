import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Rating.module.css';
import PropTypes from 'prop-types';

const Rating = ({rating}) => {
    let ratingArray;
    //const  = <FontAwesomeIcon className={classes.starBorder} icon="fa fa-star" />;
    const star        = <FontAwesomeIcon icon="fa-solid fa-star" />;
    const star_half   = <FontAwesomeIcon icon="fa-solid fa-star-half" />;

    //console.log('rating ', rating);

    switch (true) {
        case (rating  == 5  )                   : ratingArray = [star,star,star,star,star];
            break;
        case( rating >=4.5 && rating <5)        : ratingArray = [star,star,star,star,star_half];
            break;
        case (rating >=4   && rating <4.5   )   : ratingArray = [star,star,star,star];
            break;
        case (rating >=3.5 && rating <4  )      : ratingArray = [star,star,star,star_half];
            break;
        case (rating >=3   && rating <3.5  )    : ratingArray = [star,star,star,];
            break;
        case (rating >=2.5 && rating <3   )     : ratingArray = [star,star,star_half];
            break;
        case (rating >=2   && rating <=2.5   )  : ratingArray = [star,star];
            break;
        case (rating >=1.5 && rating <2  )      : ratingArray = [star,star_half];
            break;
        case (rating >=1   && rating <1.5  )    : ratingArray = [star];
            break;
        case (rating >=.5  && rating <1   )     : ratingArray = [star_half];
            break;
        case (rating >=0   && rating <.5   )    : ratingArray = [];
            break;
        default: ratingArray = [];
    }


  return (
    <div className={classes.Rating} key={rating}>{rating}</div>
  );
};


Rating.propTypes = {
    rating: PropTypes.number,
    key: PropTypes.string,
};

export default Rating;