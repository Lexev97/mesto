import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";
import {
  selectors,
  forms,
  editProfileButton,
  addNewPlaceButton,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  profilePopup,
  cardPopup,
  cardsGrid,
  initialCards,
  imagePopup,
} from "../utils/constants.js";

const userInfo = new Userinfo({
  userNameSelector: profileName,
  descriptionSelector: profileDescription,
});
const editProfilePopup = new PopupWithForm(profilePopup, (e, formsData) => {
  e.preventDefault();
  const updatedUserInfo = {
    name: formsData.nameInput,
    description: formsData.descriptionInput,
  };
  userInfo.setUserInfo(updatedUserInfo);
  editProfilePopup.close();
});
const createPlaceCardPopup = new PopupWithForm(cardPopup, (e, formsData) => {
  e.preventDefault();
  const cardInfo = {
    name: formsData.placeName,
    link: formsData.imgLink,
  };
  const newCard = new Section(
    { items: cardInfo, renderer: cardRenderer },
    cardsGrid
  );
  newCard.renderItems();
  createPlaceCardPopup.close();
});

const openProfilePopup = () => {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileDescriptionInput.value = userInfo.getUserInfo().description;
  editProfilePopup.open();
};
const openCardPopup = () => {
  createPlaceCardPopup.open();
};
const cardRenderer = (item) => {
  const card = new Card(item, "#place-card", (data) => {
    const popup = new PopupWithImage(imagePopup);
    popup.open(data);
    popup.setEventListeners();
  });
  const cardElement = card.createCard();
  cardsList.setItem(cardElement);
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: cardRenderer,
  },
  cardsGrid
);

cardsList.renderItems();

forms.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});

editProfileButton.addEventListener("click", openProfilePopup);
addNewPlaceButton.addEventListener("click", openCardPopup);
editProfilePopup.setEventListeners();
createPlaceCardPopup.setEventListeners();
