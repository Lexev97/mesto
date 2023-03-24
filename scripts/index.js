import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const selectors = {
  typeErrorMod: "popup__input_type_error",
  errorActiveMod: "popup__input-error_active",
  btnDisabledMod: "popup__save_disabled",
};

const forms = Array.from(document.forms);

const editProfileButton = document.querySelector(".profile__edit");
const addNewPlaceButton = document.querySelector(".profile__add");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profilePopup = document.querySelector(".profile-popup");
const profileNameInput = profilePopup.querySelector("#name-input");
const profileDescriptionInput =
  profilePopup.querySelector("#description-input");
const submitProfilePopupButton = profilePopup.querySelector(".popup__form");

const cardPopup = document.querySelector(".card-popup");
const placeNameInput = cardPopup.querySelector("#place-name");
const imgLinkInput = cardPopup.querySelector("#img-link");
const submitCardPopupButton = cardPopup.querySelector(".popup__form");

const closeButtons = document.querySelectorAll(".popup__close");

const cardsGrid = document.querySelector(".elements__grid");
const initialCards = [
  {
    name: "Карачаево-Черкессия",
    link: "./images/karachaevsk.jpg",
  },
  {
    name: "Гора Эльбрус",
    link: "./images/elbrus.jpg",
  },
  {
    name: "Домбай",
    link: "./images/dombai.jpg",
  },
  {
    name: "Мурманск",
    link: "./images/murmansk.jpg",
  },
  {
    name: "Абхазия",
    link: "./images/abhazia.jpg",
  },
  {
    name: "Красная поляна",
    link: "./images/red-clearing.jpg",
  },
];

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const openProfilePopup = (e) => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profilePopup);
};
const openCardPopup = () => openPopup(cardPopup);

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
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

const renderCard = (card) => {
  const newCard = new Card(card, "#place-card");
  cardsGrid.prepend(newCard.createCard());
};

editProfileButton.addEventListener("click", openProfilePopup);
submitProfilePopupButton.addEventListener("submit", handleProfileFormSubmit);

addNewPlaceButton.addEventListener("click", openCardPopup);
submitCardPopupButton.addEventListener("submit", handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

initialCards.forEach(renderCard);
forms
  .map((item) => {
    return "#" + item.id;
  })
  .forEach((id) => {
    const formValidator = new FormValidator(selectors, id);
    formValidator.enableValidation();
  });
