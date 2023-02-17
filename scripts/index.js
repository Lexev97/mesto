const editButton = document.querySelector(".profile__edit");
const addNewPlaceButton = document.querySelector(".profile__add");

const imageModal = document.querySelector(".popup-img");
const fullSizeImage = imageModal.querySelector(".popup-img__image");
const imageCaption = imageModal.querySelector(".popup-img__caption");

const editModal = document.querySelector(".popup");
const saveButtonModal = document.querySelector(".popup__save");
const popupTitle = document.querySelector(".popup__title");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const profileName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const closeButton = document.querySelector(".popup__close");
const closeImgButton = document.querySelector(".popup-img__close");

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

const showModalHandler = (e) => {
  editModal.classList.remove("fade-out");
  editModal.classList.add("popup_opened");

  if (e.target.classList.value === "profile__edit") {
    popupTitle.textContent = "Редактировать профиль";
    nameInput.value = profileName.innerText;
    descriptionInput.value = description.innerText;
    saveButtonModal.textContent = "Сохранить";
  } else {
    popupTitle.textContent = "Новое место";
    nameInput.placeholder = "Название";
    descriptionInput.placeholder = "Ссылка на картинку";
    saveButtonModal.textContent = "Создать";
  }
};

const openImageHandler = (e) => {
  imageModal.classList.remove("fade-out");
  imageModal.classList.add("popup-img_opened");
  fullSizeImage.src = e.target.src;
  fullSizeImage.alt = e.target.alt;
  imageCaption.textContent = e.target.alt;
};

const closeEditModalHandler = () => {
  editModal.classList.add("fade-out");
  setTimeout(() => {
    editModal.classList.remove("popup_opened");
    nameInput.value = "";
    descriptionInput.value = "";
  }, 300);
};

const closeImgModalHandler = () => {
  imageModal.classList.add("fade-out");
  setTimeout(() => {
    imageModal.classList.remove("popup-img_opened");
  }, 300);
};

const saveDataHandler = (e) => {
  e.preventDefault();
  if (e.submitter.textContent === "Сохранить") {
    profileName.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closeEditModalHandler();
  } else {
    const newCard = {
      name: nameInput.value,
      link: descriptionInput.value,
    };
    renderTheCard(newCard);
    closeEditModalHandler();
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
    .addEventListener("click", openImageHandler);
  placeCard
    .querySelector(".elements__heart")
    .addEventListener("click", likePlaceHandler);
  placeCard
    .querySelector(".elements__trashcan")
    .addEventListener("click", deleteCardHandler);
  cardsGrid.prepend(placeCard);
};

editButton.addEventListener("click", showModalHandler);
addNewPlaceButton.addEventListener("click", showModalHandler);
closeButton.addEventListener("click", closeEditModalHandler);
closeImgButton.addEventListener("click", closeImgModalHandler);
popupForm.addEventListener("submit", saveDataHandler);

initialCards.forEach((item) => {
  renderTheCard(item);
});
