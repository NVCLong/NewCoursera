
const jwt=require('jsonwebtoken')


const middlewareController={
    // verify
    verifyToken(req, res,next){
        const token = req.cookies.accessToken
        console.log(token)
        if(token){
            jwt.verify(token,'secret',(e,user)=>{
                if(e){
                    res.status(404).json("token is not valid")
                }
                req.user=user
                next()
            })
        }
        else {
            res.status(404).json("you are not authenticated")
        }
    }
}

// store token
//1. Local storage
// => easy to attack by XSS
// 2. cookies ( HTTP cookies)
// => hard top attack by XSS
// but can easy to attack by CSRF but can enhance by using SAME STATE
// 3. Redux store to store access token
//    http cookies to store refresh token

module.exports=middlewareController