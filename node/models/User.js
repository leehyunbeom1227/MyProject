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
    
   var token = jwt.sign(user._id.toHexString(), 'secretToken');

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

userSchema.statics.findByToken = function ( token, cb ) {
    var user = this;

    //user._id + '' = token
    //토큰을 decode 한다.
    jwt.verify(token,'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token" : token}, function (err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
} 


const User = moongoose.model('User', userSchema) // schema는 model로 감싸야함

module.exports = { User } //다른곳에서도 쓸 수 있게 export