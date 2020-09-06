const settings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_value_error',
    errorClass: 'popup__input-error_active'
  });

export const popup = document.querySelector('.popup');
export const form = popup.querySelector('.popup__form');

export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupNewPlace = document.querySelector('.popup_new-place');
export const popupPhotoZoom = document.querySelector('.popup_photo-zoom')
export const inputName = document.querySelector('.popup__input_value_name');
export const inputJob = document.querySelector('.popup__input_value_job');
export const inputLink = document.querySelector('.popup__input_value_link');
export const inputPlace = document.querySelector('.popup__input_value_place');

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAddButton = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__job');


export {settings};