import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
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
  submitProfilePopupButton,
  cardPopup,
  placeNameInput,
  imgLinkInput,
  submitCardPopupButton,
  cardsGrid,
  initialCards,
  imagePopup,
} from "../utils/constants.js";

const openProfilePopup = (e) => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
};
const openCardPopup = () => openPopup(cardPopup);

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profilePopup);
};
const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const newCard = {
    name: placeNameInput.value,
    link: imgLinkInput.value,
  };
  renderCard(newCard);
  e.target.reset();
  closePopup(cardPopup);
};

editProfileButton.addEventListener("click", openProfilePopup);
submitProfilePopupButton.addEventListener("submit", handleProfileFormSubmit);

addNewPlaceButton.addEventListener("click", openCardPopup);
submitCardPopupButton.addEventListener("submit", handleCardFormSubmit);

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#place-card", (data) => {
        const popup = new PopupWithImage(imagePopup);
        popup.open(data);
        popup.setEventListeners();
      });
      const cardElement = card.createCard();
      cardsList.setItem(cardElement);
    },
  },
  cardsGrid
);

cardsList.renderItems();

forms.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});
