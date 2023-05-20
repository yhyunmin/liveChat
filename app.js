const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const io = require("socket.io")(http); // socket.io
const path = require("path");
const db = require("./config/db");

const PORT = process.env.PORT || 7999;

const dotenv = require("dotenv");
dotenv.config();

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
// static 폴더 연결
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));

// const indexRouter = require("./routes/index");

// app.use("/", indexRouter);
let myNick2;
const nickObj = {};
app.get("/", function (req, res) {
  // res.render("index", {
  //   nickList: nickObj,
  // });
  res.render("index", {
    nickList: nickObj,
  });
});
app.post("/chat", function (req, res) {
  myNick2 = req.body.name;
  console.log("req.body.name >> ", req.body.name);
  res.render("chat", {
    name: req.body.name,
  });
});

function updateNickList() {
  io.emit("updateNicks", nickObj);
}

//   // 서버에 접속한 클라이언트들에게 nickObj 에 변경이 일어났음을 알리는 이벤트

// 채팅방 입장
io.on("connection", (socket) => {
  console.log("a user connected socket.id =>", socket.id);
  // index 페이지에서 chat으로 넘어올 시 객체에 아이디 추가
  nickObj[socket.id] = myNick2;
  // // todo 테스트 1페이지에서 2페이지 넘기기
  // socket.on("test", (data) => {
  //   console.log("test", data);
  //   myNick = data.myNick;
  //   const data2 = {
  //     myNick: data.myNick,
  //   };
  //   socket.emit("receiveTest", myNick2);
  // });
  // // 닉네임 검사
  // socket.on("setNick", (nick) => {
  //   if (Object.values(nickObj).indexOf(nick) > -1) {
  //     socket.emit("error", "이미 존재하는 닉네임입니다.");
  //   } else {
  //     //아이디 통과
  //     nickObj[socket.id] = nick;
  socket.on("entryChat", () => {
    io.emit("notice", `${myNick2}님이 입장하셨습니다.`);
    updateNickList();
  });
  // console.log(nickObj);
  //     socket.emit("entry", nick);
  //     updateNickList();
  //   }
  // });
  socket.on("disconnect", () => {
    io.emit("notice", `${myNick2}님이 퇴장하셨습니다.`);
    delete nickObj[socket.id];
    updateNickList();
  });
  socket.on("send", (data) => {
    // console.log("send 받았슴다", data);
    const sendData = {
      nick: data.nick,
      msg: data.msg,
      sid: "rid" + data.sid,
    };
    io.emit("newMessage", sendData);
  });

  // 반응 주고 받기
  socket.on("quake", (data) => {
    // console.log("quake", data);
    const obj = {
      first: data.reactID,
      // second: data.reactID[1],
      nick:data.nick,
      id: data.rid,
    };
    io.emit("react", obj);
  });
  socket.on("tada", (data) => {
    // console.log("tada", data);
    const obj = {
      first: data.reactID,
      // second: data.reactID[1],
      nick:data.nick,
      id: data.rid,
    };
    io.emit("react", obj);
  });
  socket.on("heartBeat", (data) => {
    // console.log("heartBeat", data);
    const obj = {
      first: data.reactID,
      // second: data.reactID[1],
      nick:data.nick,
      id: data.rid,
    };
    io.emit("react", obj);
  });
  socket.on("rubber", (data) => {
    // console.log("rubber", data);
    const obj = {
      first: data.reactID,
      // second: data.reactID[1],
      nick:data.nick,
      id: data.rid,
    };
    io.emit("react", obj);
  });
  socket.on("hinge", (data) => {
    // console.log("hinge", data);
    const obj = {
      first: data.reactID,
      // second: data.reactID[1],
      nick:data.nick,
      id: data.rid,
    };
    io.emit("react", obj);
  });
});
http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
