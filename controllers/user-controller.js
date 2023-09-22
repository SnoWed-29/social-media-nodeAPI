import User from "../model/User.js";
import bcrypt from "bcryptjs"
 const getAllUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No Users Found"});
    }

    return res.status(200).json({ users })
};

const signup = async (req, res, next) => {
    const {name, email, password } = req.body;

    let existingUser;
    try {   
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }

    if(existingUser){
        return res.status(400).json({message: "User Already Exists ! Login Instead"})
    }
    
    const hashPassword = bcrypt.hashSync(password);
   
    const user = new User({
        name,
        email,
        password: hashPassword, 
        blogs:[]
    })
     

    try{
       await user.save();
    }catch(err){
        return  console.log(err);
    }

    return res.status(201).json({user})
};

const login = async (req, res, next) =>{
    const {email, password} = req.body ;
    let existingUser;
    try {   
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }

    if(!existingUser){
        return res.status(404).json({message: "This user is not registerd !"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }
    return res.status(200).json({message: "Login Successfull"})
};
export {getAllUsers, signup, login } 