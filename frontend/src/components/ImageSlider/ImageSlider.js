import { useState } from 'react';
import classes from './ImageSlider.module.css';
import PropTypes from 'prop-types';

const ImageSlider = ({ collection }) => {
  console.log('imagedata = ', collection);
  let myCollection = [];

  collection.map((image, index)=>{
    myCollection.push({
      label: `image number ${index+1}`,
      url: image
    });
  });

  const[index, setIndex] = useState(0);
 
  const next = () => {
    const isLastsSlide = index === myCollection.length - 1;
    const newIndex = isLastsSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  const previous = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? myCollection.length -1 : 0;

  };

  const goToSlide = (collectionIndex) => {
    setIndex(collectionIndex);
  };

  const slideStylesWithImage = {
    backgroundImage:  `url(${myCollection[index].url})`
  };

  const dots = myCollection.map((slide, index) => {
    return <div 
      className = {classes.Dot}
      key   = {index}
      onClick = {()=>goToSlide(index)}
    >●</div>;
  });

//  console.log('dots = ', dots);

  return (
    <div className={classes.ImageSlider}>
      <div>
        <div className={[classes.Arrow, classes.LeftArrow].join(' ')}  onClick={previous}>❰</div>
        <div className={[classes.Arrow, classes.RightArrow].join(' ')} onClick={next}>❱</div>
      </div>
      <div className={classes.SlideWrapper} >
        <div className={classes.Slide} style={slideStylesWithImage} />
      </div>
      <div className={classes.DotsContainer}>
        {dots}
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  collection: PropTypes.any
};

export default ImageSlider;