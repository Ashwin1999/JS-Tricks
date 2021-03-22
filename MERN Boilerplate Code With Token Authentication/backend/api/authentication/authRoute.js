const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./User");
const Reset = require("../models/Reset");

const { registerValidation, loginValidation } = require("./authValidation");

const verifyToken = require("./authMiddleware");

router.post("/resetForgotPassword-id", async (req, res) => {
  // GET REGISTERED EMAIL
  const { email } = req.body;
  // VALIDATE EMAIL
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists)
    return res.json({ message: "ERR", Detail: "Email not registered" });
  // CREATE EXPIRING RESET-ID
  const resetExist = await Reset.findOne({ email: req.body.email });
  if (resetExist)
    return res.json({
      message: "ERR",
      Detail: "Please check your email inbox",
    });
  const newReset = new Reset({
    email,
  });
  // TRY TO SAVE THE REQUEST
  try {
    const savedReset = await newReset.save();
    res.json({ data: savedReset });
  } catch (err) {
    res.json({ message: "ERR", Detail: err });
  }
});

router.post("/resetForgotPassword", async (req, res) => {
  // GET NEW PASSWORD AND RESET-ID
  const { id, newPassword } = req.body;
  // SAVE IF USER VALID
  const resetUser = await Reset.findById(id);
  if (!resetUser)
    return res.json({
      message: "ERR",
      Detail: "Either email not registered or link expired",
    });
  // HASH PASSWORD
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(newPassword, salt);
  // FIND USER ID
  const user = await User.findOne({ email: resetUser.email });
  // SAVE NEW HASHED PASSWORD
  const password = await User.findByIdAndUpdate(
    user._id,
    { password: hashedPassword },
    {
      useFindAndModify: false,
    }
  );
  const updatedUser = await User.findById(password._id);
  // DELETE RESET-ID AFTER SUCCESSFUL RESET
  const deleteResetID = await Reset.deleteOne({ _id: id });
  res.status(200).json({ data: updatedUser, message: "OK" });
});

router.post("/resetPassword", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  // GET USER ID
  const { cookies } = req;
  const id = JSON.parse(cookies.user).user._id;
  const oldPassword = await User.findById(id);
  // VALIDATE OLD PASSWORD
  const validPassword = await bcrypt.compareSync(
    currentPassword,
    oldPassword.password
  );
  if (!validPassword)
    return res.json({ message: "ERR", Detail: "Invalid password" });
  // HASH PASSWORD
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(newPassword, salt);
  // SAVE NEW HASHED PASSWORD
  const password = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    {
      useFindAndModify: false,
    }
  );
  const updatedUser = await User.findById(password._id);
  res.status(200).json({ data: updatedUser, message: "OK" });
});

router.post("/register", async (req, res) => {
  // CHECK IF FIELDS ARE VALID
  const { error } = registerValidation(req.body);
  if (error)
    return res.json({ message: "ERR", Detail: error.details[0].message });
  // CHECK IF EMAIL CLASHES WITH ANOTHER USER
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.json({ message: "ERR", Detail: "User with that email exists" });
  // HASH PASSWORD
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
  // CREATE USER WITH THE HASHED PASSWORD
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  // TRY TO SAVE USER
  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.json({ message: "ERR", Detail: err });
  }
});

router.post("/login", async (req, res) => {
  const exp = 30;
  // CHECK IF FIELDS ARE VALID
  const { error } = loginValidation(req.body);
  if (error)
    return res.json({ message: "ERR", Detail: error.details[0].message });
  // CHECK IF USER WITH EMAIL EXIST
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "ERR", Detail: "Invalid email" });
  // CHECK IF PASSWORD IS VALID
  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!validPassword)
    return res.json({ message: "ERR", Detail: "Invalid password" });
  // IF ALL SATISFY
  const accessToken = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.ACCESS_TOKEN_SECRET
  );
  curUser = { _id: user._id, name: user.name, email: user.email };
  let toSend = {
    accessToken,
    user: curUser,
  };
  res
    .status(202)
    .cookie("user", JSON.stringify(toSend), {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + exp * 60 * 1000),
      httpOnly: false,
      // secure: true,
    })
    .json(toSend);
});

module.exports = router;
