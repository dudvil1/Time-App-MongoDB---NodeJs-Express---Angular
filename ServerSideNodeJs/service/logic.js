const repository = require("../service/repository"); 
const jwtToken = require("../service/token");
const bcryptPaswords = require("../service/bcryptPaswords");
const sendMail = require("../service/sendMail");


 class logic {
  tryToLogIn(reqUser) {
     // בדיקה אם המשתמש קיים
     let currentUser = repo.isUserExist(reqUser);
    if (!currentUser.user)
      return {
        message: "User Didn'nt Exist",
        answer: false
      };
      //אם קיים בדיקה האם החשבון שלו מאוקטב
    if (repo.isUserActivet(currentUser.user).outcome === false)
      return {
        message:
          "You Didn`t Verify Your Account Yet,Please Check Your Mail Box And Verify It",
        answer: false
      };
      //במידה וכן בדיקה האם הסיסמא נכונה
    let checkPassword = bcryptPaswords.checkPassword(
      reqUser.password,
      currentUser.password
    );
    if (checkPassword.outcome === false)
      return {
        message: "Password Is Not Okey, Please Try Again",
        answer: false
      };
      //הכל טוב!מייצר טוקן ושולח חזרה
    let token = jwtToken.sign(reqUser);
    return {
      message: "Auth successful",
      user_type: reqUser.user_type,
      token: token 
     }; 
  }  
}

module.exports = new logic();
