class FormValidator {
  constructor(selectors, formId) {
    this._typeErrorMod = selectors.typeErrorMod;
    this._errorActiveMod = selectors.errorActiveMod;
    this._btnDisabledMod = selectors.btnDisabledMod;
    this._formId = formId;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._typeErrorMod);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveMod);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._typeErrorMod);
    errorElement.classList.remove(this._errorActiveMod);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    this._buttonElement = formElement.querySelector(".popup__save");
    this._toggleButtonState(this._inputList, this._buttonElement);
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this._toggleButtonState(this._inputList, this._buttonElement);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._btnDisabledMod);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this._btnDisabledMod);
      buttonElement.removeAttribute("disabled", "");
    }
  }

  enableValidation() {
    this._formElement = document.querySelector(this._formId);
    this._setEventListeners(this._formElement);
  }
}

export default FormValidator;
