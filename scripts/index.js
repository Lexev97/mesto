const editProfileButton = document.querySelector(".profile__edit");
const addNewPlaceButton = document.querySelector(".profile__add");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profilePopup = document.querySelector(".profile-popup");
const profileNameInput = profilePopup.querySelector("#name");
const profileDescriptionInput = profilePopup.querySelector("#description");
const submitProfilePopupButton = profilePopup.querySelector(".popup__save");
const closeProfilePopupButton = profilePopup.querySelector(".popup__close");

const cardPopup = document.querySelector(".card-popup");
const placeNameInput = cardPopup.querySelector("#place-name");
const imgLinkInput = cardPopup.querySelector("#img-link");
const submitCardPopupButton = cardPopup.querySelector(".popup__save");
const closeCardPopupButton = cardPopup.querySelector(".popup__close");

const imagePopup = document.querySelector(".image-popup");
const fullSizeImage = imagePopup.querySelector(".popup__image");
const fullSizeImageCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

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

const openPopupHandler = (e) => {
  if (e.target.className === "profile__edit") {
    profilePopup.classList.add("popup_opened");
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  } else if (e.target.className === "profile__add") {
    cardPopup.classList.add("popup_opened");
  } else {
    imagePopup.classList.add("popup_opened");
    fullSizeImage.src = e.target.src;
    fullSizeImageCaption.textContent = e.target.alt;
  }
};
const closePopupHandler = (e) => {
  const popupClassList = Array.from(e.target.closest("section").classList);
  if (popupClassList.includes("profile-popup")) {
    profilePopup.classList.remove("popup_opened");
  } else if (popupClassList.includes("card-popup")) {
    cardPopup.classList.remove("popup_opened");
  } else {
    imagePopup.classList.remove("popup_opened");
  }
};

const submitPopupHandler = (e) => {
  e.preventDefault();
  const popupClassList = Array.from(e.target.closest("section").classList);
  if (popupClassList.includes("profile-popup")) {
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopupHandler(e);
  } else {
    const newCard = {
      name: placeNameInput.value,
      link: imgLinkInput.value,
    };
    renderTheCard(newCard);
    closePopupHandler(e);
  }
};

const deleteCardHandler = (e) => {
  e.target.closest(".elements__element").remove();
};

const likePlaceHandler = (e) => {
  e.target.classList.toggle("elements__heart_liked");
};

const renderTheCard = (card) => {
  const placeCard = placeCardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  placeCard.querySelector(".elements__image").src = card.link;
  placeCard.querySelector(".elements__name").textContent = card.name;
  placeCard.querySelector(".elements__image").alt = card.name;
  placeCard
    .querySelector(".elements__image")
    .addEventListener("click", openPopupHandler);
  placeCard
    .querySelector(".elements__heart")
    .addEventListener("click", likePlaceHandler);
  placeCard
    .querySelector(".elements__trashcan")
    .addEventListener("click", deleteCardHandler);
  cardsGrid.prepend(placeCard);
};

editProfileButton.addEventListener("click", openPopupHandler);
submitProfilePopupButton.addEventListener("click", submitPopupHandler);
closeProfilePopupButton.addEventListener("click", closePopupHandler);

addNewPlaceButton.addEventListener("click", openPopupHandler);
submitCardPopupButton.addEventListener("click", submitPopupHandler);
closeCardPopupButton.addEventListener("click", closePopupHandler);

closeImagePopupButton.addEventListener("click", closePopupHandler);

initialCards.forEach((item) => {
  renderTheCard(item);
});
