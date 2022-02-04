"use strict";

const chat = io("/chat");

chat.on("interval message", (data) => console.log(data));

const rooms = JSON.parse(datas.replaceAll("&#34;", '"'));

let chattingPopup = null;

const joinRoom = () => {
  console.log("Start Loading");
  const name = document.getElementById("roomName").value;

  if (!name) {
    console.log("End Loading");
    alert("Don't empty room name");
    return;
  }

  fetch("/chat/join-room", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .then((res) => {
      const { name, roomId } = res;

      chat.emit("join-room", { roomId });
      chat.on("user-connected", (data) => console.log(data));
      chattingPopup = new ChattingPopup({
        title: `${name} Room`,
        socket: chat,
        roomId,
      });

      chattingPopup.setButton().show();

      const liTag = document.createElement("li");
      const listTag = document.getElementById("list");

      if (rooms.length < 1) listTag.removeChild(listTag.firstChild);

      const btnTag = document.createElement("button");
      btnTag.innerText = res.name;
      btnTag.addEventListener("click", () => {
        // fetch("/chat/click-room", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify({ roomId: room.roomId }),
        // });
        location.href = `/chat/room/${roomId}`;
      });

      liTag.append(btnTag);
      listTag.append(liTag);
      // location.href = res.url
    })
    .catch((e) => console.log(e))
    .finally(() => console.log("End Loading"));
};

(() => {
  if (rooms.length > 0) {
    rooms.forEach((room) => {
      const liTag = document.createElement("li");
      const btnTag = document.createElement("button");

      btnTag.innerText = room.name;
      btnTag.addEventListener("click", () => {
        // fetch("/chat/click-room", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify({ roomId: room.roomId }),
        // });
        location.href = `/chat/room/${room.roomId}`;
      });

      liTag.append(btnTag);
      document.getElementById("list").append(liTag);
    });
  } else {
    const liTag = document.createElement("li");

    liTag.innerText = "No room list";
    document.getElementById("list").append(liTag);
  }
})();
