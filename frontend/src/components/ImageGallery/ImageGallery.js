import {useState} from 'react';
import classes from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({collection}) => {
    console.log('imagedata = ', collection);
    let myCollection = [];

    collection.map((image, index)=>{
      myCollection.push({
        label: `image number ${index+1}`,
        url: image
      });
    });

  console.log('myCollection', myCollection);

  const[index, setIndex] = useState(0);
  const goToSlide = (collectionIndex) => {
    setIndex(collectionIndex);
  };
  
  const slideStylesWithImage = {
    backgroundImage:  `url(${myCollection[index].url})`
  };

  const preview = myCollection.map((slide, i)=>{
    return <img
        className={classes.preview}
        key={i}
        src={myCollection[i].url}
    />;
  });

  return (
    <div className={classes.ImageGallery}>
        <div className={classes.SlideWrapper} >
            <div className={classes.Slide} style={slideStylesWithImage} />
        </div>
        <div className={classes.PreviewWrapper}>
            {preview}
        </div>
    </div>
  );
};

ImageGallery.propTypes = {
    collection : PropTypes.array
};

export default ImageGallery;