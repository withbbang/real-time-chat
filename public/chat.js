// 지정 namespace로 접속한다
var chat = io("http://localhost:4000/chat"),
  news = io("/news");

$("form").submit(function (e) {
  e.preventDefault();

  // 서버로 자신의 정보를 전송한다.
  chat.emit("chat message", {
    name: $("#name").val(),
    room: $("#room").val(),
    msg: $("#msg").val(),
  });
});

// 서버로부터의 메시지가 수신되면
chat.on("chat message", function (data) {
  $("#chat").append($("<li>").text(data));
});
