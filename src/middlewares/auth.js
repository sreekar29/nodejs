const adminAuth = (req, res, next)=>{
    console.log("Admin user middleware");
    const token = "abcdef";
    const authorization = token === "abcdef";
    if(!authorization) {
        res.status(401).send("Unauthorized");
    }   
    else{
        next();
    }
}

const userAuth = (req, res, next)=>{
    console.log("User middleware");
    const token = "abcdef";
    const authorization = token === "abcdef";
    if(!authorization) {
        res.status(401).send("Unauthorized");
    }   
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}