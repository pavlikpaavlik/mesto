const settings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_value_error',
    errorClass: 'popup__input-error_active'
  });

  const showInputError = (formItem, inputItem, errorMessage, inputErrorClass, errorClass) => {
      const errorItem = formItem.querySelector(`#${inputItem.id}-error`);
      inputItem.classList.add(inputErrorClass);
      errorItem.textContent = errorMessage;
      errorItem.classList.add(errorClass);
  };

  const hasInvalidInput = (inputList) => {
      return inputList.some((inputItem) => {
          return !inputItem.validity.valid;
      });
  };

  const hideInputError =(formItem, inputItem, inputErrorClass, errorClass) => {
    const errorItem = formItem.querySelector(`#${inputItem.id}-error`);
    inputItem.classList.remove(inputErrorClass);
    errorItem.classList.remove(errorClass);
    errorItem.textContent = '';
};

const checkInputValidity = (formItem, inputItem, inputErrorClass, errorClass) => {
    if (!inputItem.validity.valid) {
        showInputError(formItem, inputItem, inputItem.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formItem, inputItem, inputErrorClass, errorClass);
    }
};

  const changeButtonState =(inputList, buttonItem, inactiveButtonClass) => {
      if (hasInvalidInput(inputList)) {
        buttonItem.classList.add(inactiveButtonClass);
      } else {
        buttonItem.classList.remove(inactiveButtonClass);
      }
  };

  const setEventListeners = (formItem) => {
      const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
      const buttonItem = formItem.querySelector(settings.submitButtonSelector);
      changeButtonState(inputList, buttonItem, settings.inactiveButtonClass);
      inputList.forEach((inputItem) => {
          inputItem.addEventListener('input', function () {
              checkInputValidity(formItem, inputItem, settings.inputErrorClass, settings.errorClass);
              changeButtonState(inputList, buttonItem, settings.inactiveButtonClass);
          });
      });
  };

  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formItem) => {
        formItem.addEventListener('submit',function (evt) {
            evt.preventDefault();
        });
      const fieldSetList=formItem.querySelectorAll('.popup__field');
      fieldSetList.forEach((fieldSet) => {
          setEventListeners(fieldSet);
      });
    });
};

enableValidation(settings);
