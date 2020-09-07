export default class FormValidator {
    constructor(settings, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass
        this._errorClass = settings.errorClass;
  }

  _showInputError(inputItem, errorMessage)  {
      const errorItem = this._formSelector.querySelector(`#${inputItem.id}-error`);
      inputItem.classList.add(this._inputErrorClass);
      errorItem.textContent = errorMessage;
      errorItem.classList.add(this._errorClass);
  };

  _hasInvalidInput() {
      return this._inputList.some((inputItem) => {
          return !inputItem.validity.valid;
      });
  };

  _hideInputError(inputItem) {
    const errorItem = this._formSelector.querySelector(`#${inputItem.id}-error`);
    inputItem.classList.remove(this._inputErrorClass);
    errorItem.classList.remove(this._errorClass);
    errorItem.textContent = '';
};

_checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
        this._showInputError(inputItem, inputItem.validationMessage);
    } else {
        this._hideInputError(inputItem);
    }
};

  _changeButtonState() {
      const buttonItem = this._formSelector.querySelector(this._submitButtonSelector);
      if (this._hasInvalidInput(this._inputList)) {
        buttonItem.classList.add(this._inactiveButtonClass);
        buttonItem.disabled = true;
      } else {
        buttonItem.classList.remove(this._inactiveButtonClass);
        buttonItem.disabled = false;
      }
  };

  resetValidation() {
    const inputData = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    inputData.forEach(input => {
      input.classList.remove(this._inputErrorClass);
    });
    const errorData = Array.from(this._formSelector.querySelectorAll('.popup__input-error'));
    errorData.forEach(error => {
      error.classList.remove(this._errorClass);
      error.textContent = "";
    });
    this._changeButtonState();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._changeButtonState(this._inputList);
    this._inputList.forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            this._checkInputValidity(inputItem);
            this._changeButtonState(this._inputList);
        });
    });
};

enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
    evt.preventDefault();
    });
    this._setEventListeners();
  }
}
