const moongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 글자수
const jwt = require('jsonwebtoken')

const userSchema = moongoose.Schema({
    name : {
        type : String,
        maxlength : 70
    },
    email: {
        type: String,
        trim : true,//john ahn@naver.com -> johnahn@naver.com
        unique: 1
    },
    password:{
        type : String,
        maxlength : 70
    },
    role : {
        type : Number,
        defalut : 0, //기본값
    },
    image : String,
    token : { // 유효성 검사용
         type : String
    },
    tokenExp :{
        type : Number
    }
})

userSchema.pre('save', function( next ){//mongoose schema
    // 비밀번호 암호화 
    var user = this;

    if(user.isModified('password')){  //비밀번호가 수정될 경우에만 바뀌도록 
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
       
            bcrypt.hash(user.password, salt, function(err, hash) { // hash = 암호화된 비밀번호
                // Store hash in your password DB.
                if(err) return next(err);
                user.password = hash;
                next();  
            });
        });
    } else { // 다른것을 바꿀때
        next();
    } 

})

userSchema.methods.comparePassword = function(plainPassword, cb) {
   
    //plainpassword 1234567 암호화된 비밀번호 $2b$10$Fw6DdQxDsMqurXhZSJQeuO2Ky2AEfhcuIqY7DDCAcN08kWcNjeB8a
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    
    var user = this;

    //jsonwebtoken을 이용해서 token을 생성하기
    
   var token = jwt.sign(user._id.toHexString(), 'secrtToken');

  //  user._id + 'secrtToken' = token
  //  -> 
  //  'secrtToken' -> user._id

    user.token = token;
    user.save(function(err, user){
        if(err){
            return cb(err)
        }
        cb(null, user)
    })
}



const User = moongoose.model('User', userSchema) // schema는 model로 감싸야함

module.exports = { User } //다른곳에서도 쓸 수 있게 export