const mongoose=require('mongoose');
const Users=mongoose.model('Users');


exports.getUser = async (req:any, res:any, next:any) => {
    if (req.user){
        res.status(req.user);
        next();
        return
    }
    res.status(401).send('Not authorized');
}

exports.createUser=async(email:any,password:any,done:any)=> {
    // create the user
    var newUser            = new Users();

    newUser.local.email    = email;
    newUser.local.password = newUser.generateHash(password);
    // save the user
    console.log(newUser)
    newUser.save(function(err:any) {
        if (err)
            throw err;

        return done(null, newUser);
    });
};

export{};