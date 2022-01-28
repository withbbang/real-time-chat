"use strict";

class ChattingPopup {
  modalTag;

  constructor(args) {
    this.modalTag = document.createElement("div");
    this.modalTag.setAttribute("class", "modal");
    this.modalTag.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return;
      const { socket } = args;
      socket.disconnect();
      this.modalTag.remove();
    });
    const modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal_body");
    modalBody.innerText = args.title;
    this.modalTag.append(modalBody);
  }

  show() {
    document.body.append(this.modalTag);
  }
}
