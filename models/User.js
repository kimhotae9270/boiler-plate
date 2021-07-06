const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
name: {
    type: String,
    maxlength: 50
},
password: {
    type: String,
    minlength: 5
},
email: {
    type: String,
    trim: true,

},
lastname: {
    type: String,
    maxlength: 50
},
role: {
    type:Number,
    default: 0
},
image:{
    type: String
},
token: {
    type: String
},
tokenExp:{
    type: Number
}
})

userSchema.pre('save', function( next ){
    var user = this;
    //비밀번호 암호화
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash
                next()
            });
        }); 

    }else{
        next()
    }
    

})

userSchema.methods.comparePassword = function(PlainPassword,cb){
    bcrypt.compare(PlainPassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
        
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //웹토큰은 이용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null,user)
        
    })
}
userSchema.statics.findByToken = function(token, cb){
    var user = this
    //토큰 디코드
    jwt.verify(token, 'secretToken', function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 디비에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = { User }