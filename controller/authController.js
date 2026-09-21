const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "please fill all the fileds" });
  } else {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "you are already registerd!" });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        fullName,
        email,
        password: hashPassword,
      });
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );
      res.status(201).json({
        message: "user registerd sucessfully!",
        Token: token,
      });
      console.log("user registerd sucessfully!");
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "please fill all the fileds" });
  } else {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        message: "Invalid email or password!",
      });
    } else {
      const verifyPassword = await bcrypt.compare(password, checkUser.password);
      if (!verifyPassword) {
        return res.json({ message: "Invalid email or password!" });
      } else {
        const token = jwt.sign(
          {
            id: checkUser._id,
            role: checkUser.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" },
        );
        return res.status(201).json({
          message: `welcome back ${checkUser.fullName}!`,
          Token: token,
        });
      }
    }
  }
};

const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user,
  });
};

module.exports = { register, login, profile };
