const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./User");
const { registerValidation, loginValidation } = require("./authValidation");

router.post("/register", async (req, res) => {
  // CHECK IF FIELDS ARE VALID
  const { error } = registerValidation(req.body);
  if (error) return res.json({ Error: error.details[0].message });
  // CHECK IF EMAIL CLASHES WITH ANOTHER USER
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.json({ Error: "User with that email exists" });
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
    res.json({ Error: err });
  }
});

router.post("/login", async (req, res) => {
  const exp = 30;
  // CHECK IF FIELDS ARE VALID
  const { error } = loginValidation(req.body);
  if (error) return res.json({ Error: error.details[0].message });
  // CHECK IF USER WITH EMAIL EXIST
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ Error: "Invalid email" });
  // CHECK IF PASSWORD IS VALID
  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!validPassword) return res.json({ Error: "Invalid password" });
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
