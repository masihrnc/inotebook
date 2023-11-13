const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require ('../middleware/fetchuser');



const JWT_SECRET = 'masihisagoodboy';

// routes1:CREATE A USER USING : POST "/api/auth/createuser" . No login required
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email', 'enter a valid email ').isEmail(),
    body('password').isLength({min:5}),
], async (req , res)=>{
    //if there uis errror return bad error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors : errors.array()});
    }
    try{
    // check whether the user with this email exist already
   let user = await User.findOne({email: req.body.email});
   if (user){
    return res.status(400).json({error : "the user with this email exist already"})
   }
   const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password , salt);

// create new user
    user = await User.create({
        name : req.body.name,
        password : secPass,
        email : req.body.email

    });
    //.then(user => res.json(user)).catch(err => {console.log(err)
   // res.json({error : 'please enter a unique value for email' , message : err.message})})
const data ={
    user : {
        id : user.id
    }
} 
   const authtoken = jwt.sign(data,JWT_SECRET);
  success = true ;
   res.json( success , authtoken)
}
catch(error){
    console.error(error.message);
    res.status(500).send("some error occurred");
}
})

// routes2:  AUTHENTICATE USER USING : POST "/api/auth/login" . No login required
router.post('/Login',[
    body('email', 'enter a valid email ').isEmail(),
    body('password' , 'password cannot be blank').exists(),
], async (req , res)=>{
    let success = false;
    //if there uis errror return bad error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
      }
      const {email,password} = req.body;
      try {
        let user = await User.findOne({email});
        if(!user){return res.status(400).json({error : "please try to login with correct credential"});}

        const passwordcompare = await bcrypt.compare(password , user.password);
        if (!passwordcompare){
            
            return res.status(400).json({success : "please try to login with correct credential"});}

        const data ={
            user : {
                id : user.id
            }
        } 
        const authtoken = jwt.sign(data,JWT_SECRET);
  success = true;
        res.json(success,authtoken)

      } 
      catch(error){
        console.error(error.message);
        res.status(500).send("internal server occurred");
    }
})
// routes3:  GET USER  DETAILS USING : POST "/api/auth/getuser" .  login required
router.post('/getuser', fetchuser , async (req , res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
}  catch(error){
    console.error(error.message);
    res.status(500).send("internal server occurred");
    
}
})
module.exports = router