const settings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_value_error',
    errorClass: 'popup__input-error_active'
  });

  // закрытие кликом и esc
function popupsToggle (popup) {
    if (popupIsOpened(popup)) {
      document.removeEventListener('keyup', closePopupEscHandler); 
    } else {
      document.addEventListener('keyup', closePopupEscHandler);
    }
    popup.classList.toggle('popup_opened');
}

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')){
      popupsToggle(item);
    }
  });
});

const popupIsOpened = (popupItem) => {
  return popupItem.classList.contains('popup_opened');
};

const closePopupEscHandler = (evt) => {
  evt.preventDefault();
  if (evt.key == "Escape") {
    const popupItem = popupList.find(popupItem => popupIsOpened(popupItem));
    if (popupItem) {
      popupsToggle(popupItem);
    }
  }
};

export {settings, popupList, popupIsOpened, popupsToggle, closePopupEscHandler};