const settings = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_value_error',
    errorClass: 'popup__input-error_active'
  });

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');

export const popupEditAvatar = document.querySelector('.popup_avatar-edit');
export const popupButtonAvatar = popupEditAvatar.querySelector('.popup__save_avatar-edit');

export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const nameInput = popupEditProfile.querySelector('.popup__input_value_name');
export const jobInput = popupEditProfile.querySelector('.popup__input_value_job');
export const popupEditProfileButton = popupEditProfile.querySelector('.popup__save_edit-profile');

export const popupNewPlace = document.querySelector('.popup_new-place');
export const popupButtonNewPlace = popupNewPlace.querySelector('.popup__save_new-place'); 
export const popupInputNewPlaceLink = popupNewPlace.querySelector('.popup__input_value_link')

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupAddButton = document.querySelector('.profile__add-button');
export const popupAvatarButton = document.querySelector('.profile__avatar-button');

export const popupDeletePlace = document.querySelector('.popup_photo-delete');

export const popupPhotoZoom = document.querySelector('.popup_photo-zoom');

export const initialCards = [];

export {settings};