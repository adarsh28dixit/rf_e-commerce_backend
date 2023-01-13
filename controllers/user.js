const User = require("../models/user");
const bcrypt = require("bcrypt");

const { generateToken } = require("../middleware");

const getUsers = async (req, res) => {
  await User.findAll()
    .then(() => {
      res.status(201).json({ msg: "successfull" });
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });
};

const createUser = async (req, res) => {
  // Extract the data from the request body
  const { name, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 8);
  // Insert the data into the table
  //   User.create({
  //     name: name,
  //     email: email,
  //     password: hashPassword,
  //   })
  //     .then(() =>
  //       res.status(201).json({ message: "Record added successfully!" })
  //     )
  //     .catch((err) => res.status(400).json({ message: err.message }));

  //if user is already regitered
  // Find the user by email
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      return res.status(401).json({ message: "user already registered" });
    }
    // Compare the entered password with the hashed password in the database
    User.create({
      name: name,
      email: email,
      password: hashPassword,
    })
      .then(() =>
        res.status(201).json({ message: "Record added successfully!" })
      )
      .catch((err) => res.status(500).json({ message: err.message }));
  });
};

const signinUser = async (req, res) => {
  // Extract the data from the request body
  const { email, password } = req.body;

  // Find the user by email
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    // Compare the entered password with the hashed password in the database
    bcrypt
      .compare(password, user.password)
      .then((result) => {
        if (result) {
          // The passwords match
          //res.status(200).json({ message: 'Logged in successfully!' });
          res.status(200).send({
            name: user.name,
            email: user.email,
            token: generateToken(user),
          });
        } else {
          // The passwords do not match
          res.status(401).json({ message: "Email or password is incorrect" });
        }
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  });
};

module.exports = { createUser, getUsers, signinUser };
