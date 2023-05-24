import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const signup = async (req, res ) => {

  try {
    const user = await  User.findOne({name: req.body.name});
    if(user){
      res.status(404).send({message: "User already exists"})
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync( req.body.password, salt );
      const newUser = await User.create({...req.body, password: hash});
      const token = jwt.sign({email: newUser?.email, id: newUser?._id, name: newUser?.name }, 'secret', {expiresIn: '1hr'});
      const {password, ...others} = newUser?._doc;
      res.cookie('token', token, {
        httpOnly:true
      }).status(200).json(others)
    }

  } catch (error) {
    console.log(error)
  }
}


export const signin = async (req, res ) => {
  try {
    const user = await  User.findOne({email: req.body.email});
    if(!user){
      res.status(404).send("User not found")
    } else {
      const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
      if(!isCorrectPassword) res.status(400).send("Incorrect password");
      const token = jwt.sign({email: user?.email, id: user?._id, name: user?.name }, 'secret', {expiresIn: '1hr'});
      const {password, ...others} = user?._doc;
      res.cookie('token', token, {
        httpOnly:true
      }).status(200).json(others)
    }

  } catch (error) {
    console.log(error)
  }
}
