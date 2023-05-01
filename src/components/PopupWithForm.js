import Popup from "./Popup.js";
import { popupForm, selectors } from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._submitForm = submitForm;
    this._buttonElement = this._popup.querySelector(selectors.saveBtnElement);
    this._initialBtnText = this._buttonElement.textContent;
    this._form = this._popup.querySelector(popupForm);
    this._inputsList = this._form.querySelectorAll(selectors.inputElement);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputsList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      this._submitForm(e, this._getInputValues());
    });
  }

  savingProcess(isSaving) {
    if (isSaving) {
      this._buttonElement.textContent = "Сохранение...";
    } else {
      this._buttonElement.textContent = this._initialBtnText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
