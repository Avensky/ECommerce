import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Rating.module.css';
import PropTypes from 'prop-types';

const Rating = (props) => {
    let rating;
    const star_border = <FontAwesomeIcon className={classes.starBorder} icon="fa fa-star" />;
    const star        = <FontAwesomeIcon icon="fa-solid fa-star" />;
    const star_half   = <FontAwesomeIcon icon="fa-solid fa-star-half" />;

    const key = props.rating;
    console.log('rating ', key);

    switch (true) {
        case key ==5 : rating = [star,star,star,star,star];
            break;
        case key>=4.5 && key<5 : rating = [star,star,star,star,star_half];
            break;
        case key>=4 && key<4.5 : rating = [star,star,star,star,star_border];
            break;
        case key>=3.5 && key<4 : rating = [star,star,star,star_half,star_border];
            break;
        case key>=3 && key<3.5 : rating = [star,star,star,star_border,star_border];
            break;
        case key>=2.5 && key<3: rating = [star,star,star_half,star_border,star_border];
            break;
        case key>=2 && key<=2.5: rating = [star,star,star_border,star_border,star_border];
            break;
        case key>=1.5 && key<2 : rating = [star,star_half,star_border,star_border,star_border];
            break;
        case key>=1 && key<1.5 : rating = [star,star_border,star_border,star_border,star_border];
            break;
        case key>=.5 && key<1 : rating = [star_half,star_border,star_border,star_border,star_border];
            break;
        case key>=0 && key<.5 : rating = [star_border,star_border,star_border,star_border,star_border];
            break;
        default: rating = [star_border,star_border,star_border,star_border,star_border];
    }


  return (
    <div className={classes.Rating}>{rating}</div>
  );
};


Rating.propTypes = {
    rating: PropTypes.number
};

export default Rating;