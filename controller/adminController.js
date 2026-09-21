const User = require("../models/userModel.js");

const allUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    res.status(400).json({ mesg: "sucs delete", User: user})
}

module.exports = { allUser, deleteUser };