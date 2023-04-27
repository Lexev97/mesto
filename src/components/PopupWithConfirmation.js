import Popup from "./Popup.js";
import { selectors } from "../utils/constants.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, remover) {
    super(popupSelector);

    this._remover = remover;
  }

  setEventListeners() {
    this._popupSelector
      .querySelector(selectors.saveBtnElement)
      .addEventListener("click", () => this._remover());
    super.setEventListeners();
  }
}

export default PopupWithConfirmation;
