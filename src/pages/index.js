import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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
  closeButtons,
  cardsGrid,
  initialCards,
} from "../utils/constants.js";

const closeByEsc = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
};

const openProfilePopup = (e) => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
};
const openCardPopup = () => openPopup(cardPopup);

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};

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

const createCard = (data, templateId) => {
  const card = new Card(data, templateId);
  return card.createCard();
};

// const renderCard = (card) => {
//   const newCard = createCard(card, "#place-card");
//   cardsGrid.prepend(newCard);
// };

editProfileButton.addEventListener("click", openProfilePopup);
submitProfilePopupButton.addEventListener("submit", handleProfileFormSubmit);

addNewPlaceButton.addEventListener("click", openCardPopup);
submitCardPopupButton.addEventListener("submit", handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, "#place-card");
      cardsList.setItem(cardElement);
    },
  },
  cardsGrid
);

cardsList.renderItems();

// initialCards.forEach(renderCard);
forms.forEach((formElement) => {
  const formValidator = new FormValidator(selectors, formElement);
  formValidator.enableValidation();
});
