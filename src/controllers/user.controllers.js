const models = require("../models");
const helpers = require("../helpers");

//to sign up a user
const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, password2 } = req.body;
    if (!first_name || !last_name || !email || !password || !password2) {
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
        last_name,
        email,
        password: hash,
      };
      const user = await models.user.create(newUser);
      return res.status(201).json(user);
    }
  } catch (e) {
    console.log("error: ", e.message);
  }
};

//to sign in a registered user
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.user.findOne({ email });
    if (!user) {
      return res.status(400).json("This user does NOT exist");
    }
    const isValid = await helpers.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json("Wrong password");
    }
    return res.status(200).json("Login successful");
  } catch (e) {
    console.log("error: ", e.message);
  }
};

//to add user details 
const addDetails = async (req, res) => {
  try {
    const { city, postal_code, country, mobile } = req.body;
    const filter = {email};
    const update = {
      address: {
        city,
        postal_code,
        country,
        mobile
      }
    }
    const user = await models.user.findOneAndUpdate(filter, update, {
      new: true
    });
    if (!user) {
      return res.status(400).json("This user does NOT exist");
    }
    
    return res.status(200).json(user);
  } catch (e) {
    console.log("error: ", e.message);
  }
};

module.exports = {
  signup,
  signin,
  addDetails
};
