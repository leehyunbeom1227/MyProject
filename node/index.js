const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User } = require("./models/User");


//application/x-www-form-urlencoded 분석후 가지고 올 수 있게(bodyParser의 역할)
app.use(bodyParser.urlencoded({extended:true}));

//application/json타입을 가지고 올 수 있게
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
    }).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))





app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register',(req,res) => {

    //회원 가입 할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => { //mongoDB 메소드
        if(err) return res.json({success:false, err})
        return res.status(200).json({ //status(200)은 성공했다는 의미
            success:true
        })
    })
})

app.post('/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email : req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인    

    user.comparePassword(req.body.password , (err, isMatch) => {
        if(!isMatch){
            return res.json({ 
                loginSuccess:false,
                message:"비밀번호가 틀렸습니다."
            })
        }
        //비밀번호 까지 맞다면 토큰을 생성하기.
        user.generateToken((err, user) =>{
            if(err) return res.status(400).send(err);// 400 = 에러메세지
            
            // 토큰을 저장한다. 어디에? 쿠키(Application), local storage 
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess:true, userId: user._id})
        })    
     })
    
    })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))