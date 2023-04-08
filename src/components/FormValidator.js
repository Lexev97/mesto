class FormValidator {
  constructor(selectors, formElement) {
    this._inputElement = selectors.inputElement;
    this._saveBtnElement = selectors.saveBtnElement;
    this._typeErrorMod = selectors.typeErrorMod;
    this._errorActiveMod = selectors.errorActiveMod;
    this._btnDisabledMod = selectors.btnDisabledMod;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._typeErrorMod);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveMod);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._typeErrorMod);
    errorElement.classList.remove(this._errorActiveMod);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
    this._buttonElement = this._formElement.querySelector(this._saveBtnElement);
    this._toggleButtonState();
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._toggleButtonState();
    }); 
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._btnDisabledMod);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._btnDisabledMod);
      this._buttonElement.removeAttribute("disabled", "");
    }
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
