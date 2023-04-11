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

const openProfilePopup = () => {
  profileNameInput.value = userInfo.getUserInfo().userName;
  profileDescriptionInput.value = userInfo.getUserInfo().description;
  const editProfilePopup = new PopupWithForm(profilePopup, (e, formsData) => {
    e.preventDefault();
    const updatedUserInfo = {
      name: formsData.editProfileForm.elements.nameInput.value,
      description: formsData.editProfileForm.elements.descriptionInput.value,
    };
    userInfo.setUserInfo(updatedUserInfo);
    editProfilePopup.close();
  });
  editProfilePopup.open();
  editProfilePopup.setEventListeners();
};
const openCardPopup = () => {
  const createPlaceCardPopup = new PopupWithForm(cardPopup, (e, formsData) => {
    e.preventDefault();
    const cardInfo = {
      name: formsData.addPlaceForm.elements.placeName.value,
      link: formsData.addPlaceForm.elements.imgLink.value,
    };
    const newCard = new Section(
      { items: cardInfo, renderer: cardRenderer },
      cardsGrid
    );
    newCard.renderItems();
    createPlaceCardPopup.close();
  });
  createPlaceCardPopup.open();
  createPlaceCardPopup.setEventListeners();
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

editProfileButton.addEventListener("click", openProfilePopup);
addNewPlaceButton.addEventListener("click", openCardPopup);

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
