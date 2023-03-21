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

const imagePopup = document.querySelector(".image-popup");
const fullSizeImage = imagePopup.querySelector(".popup__image");
const fullSizeImageCaption = imagePopup.querySelector(".popup__caption");

const closeButtons = document.querySelectorAll(".popup__close");

const placeCardTemplate = document.querySelector("#place-card").content;
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
const openImagePopup = (e) => {
  fullSizeImage.src = e.target.src;
  fullSizeImage.alt = e.target.alt;
  fullSizeImageCaption.textContent = e.target.alt;
  openPopup(imagePopup);
};

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

const deleteCard = (e) => {
  e.target.closest(".elements__element").remove();
};

const toggleLike = (e) => {
  e.target.classList.toggle("elements__heart_liked");
};

const createCard = (card) => {
  const placeCard = placeCardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  const cardImage = placeCard.querySelector(".elements__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  placeCard.querySelector(".elements__name").textContent = card.name;
  cardImage.addEventListener("click", openImagePopup);
  placeCard
    .querySelector(".elements__heart")
    .addEventListener("click", toggleLike);
  placeCard
    .querySelector(".elements__trashcan")
    .addEventListener("click", deleteCard);

  return placeCard;
};

const renderCard = (card) => {
  const placeCard = createCard(card);
  cardsGrid.prepend(placeCard);
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
