import Popup from "./Popup.js";
import { popupForm, selectors } from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._buttonElement = this._popupSelector.querySelector(selectors.saveBtnElement);
  }

  _getInputValues() {
    const inputsList = Array.from(
      this._popupSelector.querySelectorAll(selectors.inputElement)
    );

    return {
      firstInput: inputsList[0].value,
      secondInput: inputsList[1].value,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(popupForm)
      .addEventListener("submit", (e) => {
        this._submitForm(e, this._getInputValues());
      });
  }

  close() {
    super.close();
    this._popupSelector.querySelector(popupForm).reset();
    this._buttonElement.classList.add(selectors.btnDisabledMod);
    this._buttonElement.setAttribute("disabled", "");
  }
}

export default PopupWithForm;
