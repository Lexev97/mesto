import { closeButton } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const popup = this._popupSelector.closest(".popup");
    const button = this._popupSelector.querySelector(closeButton);
    button.addEventListener("click", () => this.close());
    popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        this.close();
      }
    });
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
}

export default Popup;
