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
  const elementsTemplate = document.querySelector('.template-card');
  const elementTitle = elementsList.querySelector('.grid-element__title');
  const popupPhoto = popupPhotoZoom.querySelector ('.popup__photo');
  const popupName = popupPhotoZoom.querySelector ('.popup__place');
  
  function addElement (item) {
    const element = elementsTemplate.content.cloneNode(true);
    const elementPhoto = element.querySelector('.grid-element__photo');
    element.querySelector('.grid-element__title').textContent = item.name;
    elementPhoto.src = item.link;
    elementPhoto.alt = item.name;
    elementPhoto.addEventListener('click', () => photoZoomPopup(item));
  
    element.querySelector('.grid-element__trash').addEventListener('click', deleteElement);
    element.querySelector('.grid-element__like-button').addEventListener('click', likeElement);

    return element;
  }

  function renderElement(item) {
    elementsList.prepend(addElement(item));
  }

  initialCards.forEach (function (item) {
    renderElement(item);
  });
  
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
    };
    inputPlace.value = '';
    inputLink.value = '';
    renderElement(item);
  
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

// закрытие кликом и esc

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

function addEscListener () {
  document.addEventListener('keyup', closePopupEscHandler);
}

function removeEscListener () {
document.removeEventListener('keyup', closePopupEscHandler);
}