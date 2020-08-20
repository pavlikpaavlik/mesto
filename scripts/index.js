import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {settings, popupIsOpened, addEscListener, removeEscListener} from './utils.js';

const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const inputName = form.querySelector('.popup__input_value_name');
const inputJob = form.querySelector('.popup__input_value_job');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupPhotoZoom = document.querySelector('.popup_photo-zoom');

const popupEditButton = document.querySelector ('.profile__edit-button');
const popupAddButton = document.querySelector ('.profile__add-button');

const popupCloseProfile = popupEditProfile.querySelector ('.popup__close-button');
const popupCloseNewPlace = popupNewPlace.querySelector ('.popup__close-button');
const popupClosePhotoZoom = popupPhotoZoom.querySelector ('.popup__close-button');

const inputPlace = popupNewPlace.querySelector('.popup__input_value_place');
const inputLink = popupNewPlace.querySelector('.popup__input_value_link');
const placeFormElement = popupNewPlace.querySelector('.popup__container_theme_place');

const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
const popupNewPlaceValidator = new FormValidator(settings, popupNewPlace);

popupEditProfileValidator.enableValidation();
popupNewPlaceValidator.enableValidation();

const openProfilePopup = function() {
    if (!popupEditProfile.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;    
        inputJob.value = profileJob.textContent;
      }
      popupsToggle(popupEditProfile);
  };
  
  popupEditButton.addEventListener ('click', function () {
    openProfilePopup();
  });
  popupCloseProfile.addEventListener ('click', function () {
    popupsToggle(popupEditProfile);
  });
  
  function popupsToggle (popup) {
    if (popupIsOpened(popup)) {
      removeEscListener();
    } else {
      addEscListener();
    }
    popup.classList.toggle('popup_opened');
  }

  popupAddButton.addEventListener ('click', function () {
    inputPlace.value = '';
    inputLink.value = '';
    popupsToggle (popupNewPlace);
  });
  
  popupCloseNewPlace.addEventListener ('click', function () {
    popupsToggle(popupNewPlace);
  });
  
  popupClosePhotoZoom.addEventListener ('click', function () {
    popupsToggle(popupPhotoZoom);
  });
  
  //массив
  
  const elementsList = document.querySelector('.grid-elements');

  initialCards.forEach (function (item) {
    const card = new Card (item.name, item.link, '.template-card');
    const cardElement = card.generateCard();
    
    elementsList.append(cardElement);
  });
  
  function addCard(card) {
    elementsList.prepend(card);
  }

  function handlerAddElementSubmit(evt) {
    evt.preventDefault();
  
    const card = new Card (inputPlace.value, inputLink.value, '.template-card');
    const cardElement = card.generateCard();
    addCard(cardElement);
  
    popupsToggle(popupNewPlace);
  }
  placeFormElement.addEventListener('submit', handlerAddElementSubmit);
  
  //сохранения профайла
  function formSubmitHandler (evt) {
      evt.preventDefault();
  
    const editedName = inputName.value;
    const editedJob = inputJob.value;

    profileName.textContent = editedName;
    profileJob.textContent = editedJob;
    popupsToggle(popupEditProfile);
  }
  
  form.addEventListener('submit', formSubmitHandler);