"use strict";

class ChattingPopup {
  constructor(args) {
    this.socket = args.socket;
    this.modalTag = document.createElement("div");
    this.modalTag.setAttribute("class", "modal");
    this.modalTag.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.modalTag.remove();
        this.socket.disconnect();
        return;
      }
    });
    this.modalTag.innerHTML = `<div class="modal_body">
        <h3>${args.title}</h3>
        <div class="messages" id="messages"></div>
        <div class="send_message">
          <input id="message" type="text" placeholder="Type message here...">
          <button id="send">Send</button>
        </div>
      </div>`;
  }

  setButton() {
    this.modalTag.querySelector("#send").addEventListener("click", this.send);
    return this;
  }

  send() {
    const input = document.getElementById("message");
    const text = input.value;
    // TODO: this socket binding
    console.log(this.socket);
    input.value = "";
  }

  show() {
    document.body.append(this.modalTag);
    return this;
  }
}
