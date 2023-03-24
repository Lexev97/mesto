const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__save");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => setEventListeners(formElement));
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__save_disabled");
    buttonElement.removeAttribute("disabled", "");
  }
};

enableValidation();

class FormValidator {
  constructor(selectors, formId) {
    this._typeErrorMod = selectors.typeErrorMod;
    this._errorActiveMod = selectors.errorActiveMod;
    this._btnDisabledMod = selectors.btnDisabledMod;
    this._formId = formId;
  };

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._typeErrorMod);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveMod);
  };
  
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._typeErrorMod);
    errorElement.classList.remove(this._errorActiveMod);
    errorElement.textContent = "";
  };
  
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    this._buttonElement = formElement.querySelector(".popup__save");
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._btnDisabledMod);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this._btnDisabledMod);
      buttonElement.removeAttribute("disabled", "");
    }
  };

  enableValidation = () => {
    this._formElement = document.querySelector(this._formId);   
    this._setEventListeners(this._formElement);
  };
} 

export default FormValidator;
