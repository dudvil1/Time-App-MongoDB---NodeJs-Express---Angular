const jwt = require("jsonwebtoken");

module.exports =  class jwtToken{
    constructor(){}

    sign(user){
      return token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        "secret",
        {
          expiresIn: "1h"
        }
      );
    }
}
