const selectors = {
  typeErrorSelector: "popup__input_type_error",
  inputErrorSelector: "popup__input-error_active",
  inputSelector: ".popup__input",
  saveButtonSelector: ".popup__save",
  saveButtonDisabledSelector: "popup__save_disabled",
  formSelector: ".popup__form",
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.typeErrorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorSelector);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.typeErrorSelector);
  errorElement.classList.remove(settings.inputErrorSelector);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(settings.saveButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, settings);
    }, 0);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, settings));
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.saveButtonDisabledSelector);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(settings.saveButtonDisabledSelector);
    buttonElement.removeAttribute("disabled", "");
  }
};

enableValidation(selectors);
