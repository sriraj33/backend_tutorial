import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const getAllUsers = async(req, res)=>{

    try {
        const users = await User.find({})

        res.json({
            success: true,
            users
        });
    } catch (error) {
        next(error)
    }
};


export const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;

        console.log(req.body)
    
        let user = await User.findOne({ email });
    
        if(user) return next(new ErrorHandler("User Already Exist", 400))
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })
    
       setCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error)
    }
}


export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email }).select("+password")
    
        if(!user) return next(new ErrorHandler("User Doesn't Exist", 400))
    
        const isMatch = bcrypt.compare(password, user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invalid Password", 400))
    
       setCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error)
    }
}


// export const getUserById = async(req, res) => {
//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         user
//     });
// }


export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
}


export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV==="Development"?"lax":"none",
        secure: process.env.NODE_ENV==="Development"?false:true
    }).json({
        success: true,
        message: "Logged Out Successfully"
    });
}


// export const specialfunc = (req, res) => {
//     res.json({
//         success: true,
//         message: "just a message"
//     })
// }


// export const updateUser = async(req, res) => {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         message: "Updated User"
//     });
// }

// export const deleteUser = async(req, res) => {
//     const { id } = req.params;
//     const user = await User.findById(id);

//     await user.remove();

//     res.json({
//         success: true,
//         message: "Deleted User"
//     });
// }