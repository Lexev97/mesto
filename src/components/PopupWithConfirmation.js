import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, remover) {
    super(popupSelector);

    this._remover = remover;
    this._handleRemoving = this._handleRemoving.bind(this);
  }

  open(card) {
    super.open();
    this._card = card;
  }

  _handleRemoving() {
    this._remover(this._card);
  }

  setEventListeners() {
    this._popup
      .querySelector(selectors.saveBtnElement)
      .addEventListener("click", this._handleRemoving);
    super.setEventListeners();
  }

  // close() {
  //   super.close();
  //   this._popup
  //     .querySelector(selectors.saveBtnElement)
  //     .removeEventListener("click", this._handleRemoving);
  // }
}

export default PopupWithConfirmation;
