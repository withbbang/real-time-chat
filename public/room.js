"use strict";

// 지정 namespace로 접속한다
const room = io("/chat/room");

const id = window.location.href.substring(
  window.location.href.lastIndexOf("/") + 1,
);

room.emit("join-room", id);

room.on("response", (data) => console.log(data));

$("form").submit(function (e) {
  e.preventDefault();

  // 서버로 자신의 정보를 전송한다.
  room.emit("chat message", {
    name: $("#name").val(),
    room: $("#room").val(),
    msg: $("#msg").val(),
  });
});

// 서버로부터의 메시지가 수신되면
room.on("chat message", function (data) {
  $("#chat").append($("<li>").text(data));
});
