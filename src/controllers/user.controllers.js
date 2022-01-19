const models = require("../models");
const helpers = require("../helpers");
const config = require("../config");
const jwt = require("jsonwebtoken");

//to sign up a user
const signup = async (req, res) => {
  try {
    const { first_name, email, password, password2 } = req.body;
    if (!first_name || !email || !password || !password2) {
      return res.status(400).json("Required fields are empty");
    }
    if (password !== password2) {
      return res.status(400).json("Password do not match");
    }
    const userExist = await models.user.findOne({ email });
    if (userExist) {
      return res.status(400).json("User already present");
    } else {
      const hash = await helpers.bcrypt.encrypt(password);
      const newUser = {
        first_name,
        email,
        password: hash,
      };
      const user = await models.user.create(newUser);
      return res.status(201).json(user);
    }
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};

//to sign in a registered user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ email });
    console.log(JSON.stringify(user));
    if (!user) {
      return res.status(400).json({err:"This user does NOT exist"});
    }
    const isValid = await helpers.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({err:"Wrong password"});
    }
    const data = { email: user.email, user_id: user._id };
    const token = jwt.sign(data, config.jwt.secret);
    return res.status(200).json({ token, email: user.email });
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};

//to add user details
const addDetails = async (req, res) => {
  try {
    const { city, postal_code, country, mobile, data } = req.body;
    const email = data.email;
    const filter = { email };
    const update = {
      address: {
        city,
        postal_code,
        country,
      },
      mobile,
    };
    const user = await models.user.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!user) {
      return res.status(400).json("This user does NOT exist");
    }
    return res.status(200).json(user);
  } catch (e) {
    console.log("error: ", e.message);
    return res.json({ err: e.message });
  }
};

module.exports = {
  signup,
  signin,
  addDetails,
};
