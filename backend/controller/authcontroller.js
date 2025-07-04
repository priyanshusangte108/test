const expressAsyncHandler = require("express-async-handler");
const User = require("../model/authmodel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const registerUser = expressAsyncHandler(async (req, res) => {
const { name,  email, password } = req.body;

if (!name || ! email || !password) {
  res.status(401);
  throw new Error("Please Fill All Details!!");
}

// 1/Find If User Already Exists

const userExist = await User.findOne({ email });
if (userExist) {
  res.status(401);
  throw new Error("User Already Exists");
} 

// hash password

const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(password ,salt)

const user = await User.create({
    name,
    email,
    password: hashedPassword,
})

if (!user){
    res.status(400);
    throw new error ("connot register user")
}
res.status(201).json({
    id : user._id,
    name : user.name,
    email : user.email,
    token : generateToken(user._id)
})
});


const login = expressAsyncHandler(async(req,res)=>{
    const { email, password } = req.body;

    if (! email || !password) {
      res.status(401);
      throw new Error("Please Fill All Details!!");
    }

    const user = await User.findOne({email})

    if (user && bcrypt.compare(password ,user.password)) {
       res.status(200);
       res.json({
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id)
       })
    }else{
        res.status(400);
        throw new Error("invalid credentials")
    }

    
});
const privatecontroller = async(req,res)=>{
    res.send('I am private route')
 }

 const generateToken = (id)=>{
    return jwt.sign({ id } , process.env.JWT_SECRET,{
        expiresIn : '30d',
    })
 }


module.exports = {registerUser ,login , privatecontroller}

