import Popup from "./Popup.js";
import { cardPopup, popupForm, selectors } from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupSelectorOnly = popupSelector;
    this._submitForm = submitForm;
    this._buttonElement = this._popupSelector.querySelector(
      selectors.saveBtnElement
    );
  }

  _getInputValues() {
    this._inputsList = this._popupSelector.querySelectorAll(
      selectors.inputElement
    );

    this._formValues = {};
    this._inputsList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(popupForm)
      .addEventListener("submit", (e) => {
        this._submitForm(e, this._getInputValues());
      });
  }

  savingProcess(isSaving) {
    if (isSaving) {
      this._buttonElement.textContent = "Сохранение...";
    } else {
      if (this._popupSelectorOnly === cardPopup) {
        this._buttonElement.textContent = "Создать";
      } else {
        this._buttonElement.textContent = "Сохранить";
      }
    }
  }

  close() {
    super.close();
    this._popupSelector.querySelector(popupForm).reset();
    this._buttonElement.classList.add(selectors.btnDisabledMod);
    this._buttonElement.setAttribute("disabled", "");
  }
}

export default PopupWithForm;
