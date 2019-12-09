const mongoose = require("mongoose");
const User = require("../models/user");

module.exports =  class repository {
  constructor() {}

  isUserExist(user) {
    User.find({ email: user.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return {
            message: "User Didn'nt Exist",
            user: null
          };
        }
        return {
          message: "User Exist",
          user: user[0]
        };
      });
  }

  isUserActivet(user) {
    if (user.active === false) {
      return {
        message:
          "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It",
        outcome: false
      };
    }
    return {
      outcome: true
    };
  }

  addNewUser(params) {}
}

