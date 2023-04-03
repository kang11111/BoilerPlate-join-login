const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require("./models/User");

//application/x-www-from-urlencoded 형식의 data 가져오게 함
app.use(bodyParser.urlencoded({extended: true}));

//application/json 형식의 data 가져오게 함
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('err',err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req,res) => {
  //회원가입시 필요한 정보들을 client에서 가져오기
  //위 정보들을 DB에 넣기

  //body-parser를 사용했기 때문에 
  //req.body를 써서 Client가 보내는 json형식의 data를 body로부터 추출할 수 있게 됨
  const user = new User(req.body);
  //mongoDB에서 사용하는 save 함수 : 데이터 삽입(덮어쓰기)
  await user.save()
  //성공하면(res.status(200)) json형식으로 성공 메시지를 보여줌
  .then(() => {return res.status(200).json({success: true})})
  //실패하면(err가 발생하면) json형식으로 실패 메시지와 err를 보여줌
  .catch(err => {return res.json({success: false, err})})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});