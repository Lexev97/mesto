import Popup from "./Popup.js";
import {popupForm } from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues(e) {
    const formsData = document.forms;
    this._submitForm(e, formsData);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(popupForm)
      .addEventListener("submit", this._getInputValues.bind(this));
  }

  close() {
    super.close();
    this._popupSelector.querySelector(popupForm).reset();
  }
}

export default PopupWithForm;
