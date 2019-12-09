const mongoose = require('mongoose');
console.log(123);
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type:String,
        required:true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    password: {
        type:String,
        required:true
    },
    name:String,
    user_type:String,
    active:Boolean,
    times:[{    
       
    }]
});
module.exports = mongoose.model('User', userSchema);