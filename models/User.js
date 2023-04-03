const mongoose = require('mongoose');

//schema 정의
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //space 제거
    unique: 1 //이메일 유니크하게
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { //관리자와 일반유저를 나눔(일반유저 값: 0)
    type: Number,
    default: 0
  },
  image: String,
  token: { //유효성 관리
    type: String
  },
  tokenExp: { //token 유효기간 지정
    type: Number
  }
});

//model 생성. 생성한 schema를 model로 감쌈
const User = mongoose.model('User', userSchema);

//다른 곳에서도 쓸 수 있게 exports 함
module.exports = {User};