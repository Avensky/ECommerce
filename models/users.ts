//==============================================================================
// set up ======================================================================
//==============================================================================
const mongoose      = require('mongoose');
const { Schema }    = mongoose;
const bcrypt        = require('bcrypt');
const crypto        = require('crypto');

// define the schema for our user model
const userSchema    = new Schema({

    local            : {
        email        : String,
        password     : String,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false
        }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

//==============================================================================
// methods =====================================================================
//==============================================================================

userSchema.methods.createPasswordResetToken = function() {
    console.log('resetToken started');
    const resetToken = crypto.randomBytes(32).toString('hex');
    //create reset token
    this.local.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    console.log('resetToken', resetToken);


    //set expiration for 10 minutes
    this.local.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

// generating a hash
userSchema.methods.generateHash = function(password:string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password:string) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
//module.exports = mongoose.model('Users', userSchema);
//mongoose.model('Users', userSchema);
const Users = mongoose.model("Users", userSchema);
module.exports = Users;

export{}