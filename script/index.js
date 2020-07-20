const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__form');
const formSubmit = form.querySelector('.popup__save');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');
let inputName = form.querySelector('.popup__input_value_name');
let inputJob = form.querySelector('.popup__input_value_job');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupNewPlace = document.querySelector('.popup_new-place');
const popupPhotoZoom = document.querySelector('.popup_photo-zoom');

const popupEditButton = document.querySelector ('.profile__edit-button');
const popupAddButton = document.querySelector ('.profile__add-button');
const popupOpenPhotoZoom = popupPhotoZoom.querySelector ('.popup__photo');

const popupCloseProfile = popupEditProfile.querySelector ('.popup__close-button');
const popupCloseNewPlace = popupNewPlace.querySelector ('.popup__close-button');
const popupClosePhotoZoom = popupPhotoZoom.querySelector ('.popup__close-button');

const popupPhotoContainer = popupPhotoZoom.querySelector('.popup__container');
const inputPlace = popupNewPlace.querySelector('.popup__input_value_place');
const inputLink = popupNewPlace.querySelector('.popup__input_value_link');
const placeFormElement = popupNewPlace.querySelector('.popup__container_theme_place');

const openProfilePopup = function() {
    if (!popupEditProfile.classList.contains('popup_opened')) {
        inputName.value = profileName.textContent;    
        inputJob.value = profileJob.textContent;
      }
      popupsToggle(popupEditProfile);
  }
  
  popupEditButton.addEventListener ('click', function () {
    openProfilePopup();
  })
  popupCloseProfile.addEventListener ('click', function () {
    popupsToggle(popupEditProfile);
  })
  
  function popupsToggle (popup) {
    popup.classList.toggle('popup_opened');
  }
  popupAddButton.addEventListener ('click', function () {
    inputPlace.value = '';
    inputLink.value = '';
    popupsToggle (popupNewPlace);
  })
  
  popupCloseNewPlace.addEventListener ('click', function () {
    popupsToggle(popupNewPlace);
  })
  
  popupClosePhotoZoom.addEventListener ('click', function () {
    popupsToggle(popupPhotoZoom);
  })
  
  
  //массив
  
  const elementsList = document.querySelector('.grid-elements');
  const elementsTemplate = document.querySelector('.grid-elements__template');
  const elementTitle = elementsList.querySelector('.grid-element__title');
  const popupPhoto = popupPhotoZoom.querySelector ('.popup__photo');
  const popupName = popupPhotoZoom.querySelector ('.popup__place');
  
  function addElements (item) {
    const element = elementsTemplate.content.cloneNode(true);
    element.querySelector('.grid-element__title').textContent = item.name;
    element.querySelector('.grid-element__photo').src = item.link;
    element.querySelector('.grid-element__photo').addEventListener('click', () => photoZoomPopup(item));
  
    element.querySelector('.grid-element__trash').addEventListener('click', deleteElement);
    element.querySelector('.grid-element__like-button').addEventListener('click', likeElement);
    elementsList.prepend(element);
  }
  
  initialCards.forEach (function (item) {
    addElements(item);
  })
  
  //попап с фоткой
  function photoZoomPopup (item) {
  
    const photo = item.link;
    const place = item.name;
  
    popupPhoto.src = photo;
    popupName.textContent = place;
  
    popupsToggle (popupPhotoZoom);
    }
  
  // Удалить карточку
  function deleteElement (evt) {
    const element = evt.target.closest('.grid-element');
    element.remove();
  }
  // лайк
  function likeElement (evt) {
    const like = evt.target.closest('.grid-element__like-button');
    like.classList.toggle('grid-element__like-button_theme_black');
  }
  
  //Добавление карточки
  function handlerAddElementSubmit(evt) {
    evt.preventDefault();
  
    const name = inputPlace.value;
    const link = inputLink.value;
    const item = {
      name: name,
      link: link
    }
    inputPlace.value = '';
    inputLink.value = '';
    addElements(item);
  
    popupsToggle(popupNewPlace);
  }
  placeFormElement.addEventListener('submit', handlerAddElementSubmit);
  
  //сохранения профайла
  function formSubmitHandler (evt) {
      evt.preventDefault();
  
    let editedName = inputName.value;
    let editedJob = inputJob.value;

    profileName.textContent = editedName;
    profileJob.textContent = editedJob;
    popupsToggle(popupEditProfile);
  }
  
  form.addEventListener('submit', formSubmitHandler);


