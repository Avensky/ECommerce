
exports.getUser = async (req:any, res:any, next:any) => {
    if (req.user){
        res.status(req.user);
        next();
        return
    }
    res.status(401).send('Not authorized');
}