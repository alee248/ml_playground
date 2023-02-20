const express = require('express');
const mysql = require("mysql")
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
db = require("db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    response.json({ message: "Hey! This is your server response!" });
    next();
});

// register endpoint
app.post("/register", (request, response) => {
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        // create a new user instance and collect the data
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
        });
  
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch erroe if the new user wasn't added successfully to the database
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
    });
});

// login endpoint
app.post("/login", (request, response) => {
    // check if email exists
    User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
    // compare the password entered and the hashed password found
    bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

            // check if password matches
            if(!passwordCheck) {
                return response.status(400).send({
                message: "Passwords does not match",
                error,
                });
            }

            //   create JWT token
            const token = jwt.sign(
                {
                userId: user._id,
                userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            );

            //   return success response
            response.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
            });
        })
        // catch error if password do not match
        .catch((error) => {
            response.status(400).send({
                message: "Passwords does not match",
                error,
            });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
        response.status(404).send({
            message: "Email not found",
            e,
        });
    });
});
