const chat = io("/chat");

const rooms = JSON.parse(datas.replaceAll("&#34;", '"'));

const joinRoom = () => {
  const name = document.getElementById("roomName").value;

  if (!name) {
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
    .then((res) => (location.href = res.url));
};

(() => {
  if (rooms.length > 0) {
    rooms.forEach((room) => {
      const liTag = document.createElement("li");
      const btnTge = document.createElement("button");

      btnTge.innerText = room.name;
      btnTge.addEventListener("click", () => {
        // fetch("/chat/click-room", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //   },
        //   body: JSON.stringify({ roomId: room.roomId }),
        // });
        location.href = `/chat/room/${room.roomId}`;
      });

      liTag.append(btnTge);
      document.getElementById("list").append(liTag);
    });
  } else {
    const liTag = document.createElement("li");

    liTag.innerText = "No room list";
    document.getElementById("list").append(liTag);
  }
})();
