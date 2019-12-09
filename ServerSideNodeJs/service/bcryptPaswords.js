const bcrypt = require("bcryptjs");

module.exports = class bcryptPaswords {
  constructor() {}

  checkPassword(reqPassword, userPassword) {
    bcrypt.compare(reqPassword, userPassword, (err, result) => {
      if (err)
        return {
          message: "not Compare",
          outcome: false
        };
      return {
        message: "Compare",
        outcome: true
      };
    });
  }
}

