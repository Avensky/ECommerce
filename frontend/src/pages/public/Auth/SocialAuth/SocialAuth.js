import React from 'react';
import classes from './SocialAuth.module.css';

const SocialAuth = () => {
  return (
    <div className={classes.SocialAuth}>
        <br />
        <div className='text-left'>Or continue with:</div>
        <br />
        <button type='submit' className={[classes.Btn, "btn-primary"].join(' ')}>
            <a  
                href="/api/facebook"
                //onClick={socialAuthHandler}
            ><div className={classes.BtnDiv}><span className="fa fa-facebook" /> Facebook</div></a>
        </button>
        <button className={[classes.Btn, "btn-info"].join(' ')}>
            <a href="/api/twitter"><div className={classes.BtnDiv}><span className="fa fa-twitter" /> Twitter</div></a>
        </button>
        <button className={[classes.Btn, "btn-danger"].join(' ')}>
            <a href="/api/google"><div className={classes.BtnDiv}><span className="fa fa-google-plus" /> Google+</div></a>
        </button>
    </div>
  );
};

export default SocialAuth;