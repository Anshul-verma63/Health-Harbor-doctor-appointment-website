import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user register
export const userRegisterController = async (req, res) => {
  try {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exist",
      });
    }
    //hash password
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    //new user create
    const newuser = new userModel(req.body);
    await newuser.save();
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      newuser,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while user register",
      error,
    });
  }
};

//user login
export const userLoginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login success",
      token,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Error while user login",
      error,
    });
  }
};
