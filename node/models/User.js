const moongoose = require('mongoose');


const userSchema = moongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email: {
        type: String,
        trim : true,//john ahn@naver.com -> johnahn@naver.com
        unique: 1
    },
    password:{
        type : String,
        maxlength : 50
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

const User = moongoose.model('User', userSchema) // schema는 model로 감싸야함

module.exports = { User } //다른곳에서도 쓸 수 있게 export