const editButton = document.querySelector(".profile__edit");
const addNewPlaceButton = document.querySelector(".profile__add");
const editModal = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const saveButtonModal = document.querySelector(".popup__save");
const popupTitle = document.querySelector(".popup__title");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const profileName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");

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

const showModal = (e) => {
  if (e.target.classList.value === "profile__edit") {
    editModal.classList.add("popup__opened");
    popupTitle.textContent = "Редактировать профиль";
    nameInput.value = profileName.innerText;
    descriptionInput.value = description.innerText;
    saveButtonModal.textContent = "Сохранить";
  } else {
    editModal.classList.add("popup__opened");
    popupTitle.textContent = "Новое место";
    nameInput.placeholder = "Название";
    descriptionInput.placeholder = "Ссылка на картинку";
    saveButtonModal.textContent = "Создать";
  }
};

const closeEditModal = () => {
  editModal.classList.remove("popup__opened");
  nameInput.value = "";
  descriptionInput.value = "";
};

const saveDataHandler = (e) => {
  e.preventDefault();
  if (e.submitter.textContent === "Сохранить") {
    profileName.textContent = nameInput.value;
    description.textContent = descriptionInput.value;
    closeEditModal();
  } else {
    initialCards.unshift({
      name: nameInput.value,
      link: descriptionInput.value,
    });
    renderCards();
    closeEditModal();
  }
};

const likePlaceHandler = (e) => {
  console.log("работает");
  e.target.classList.toggle("elements__heart_liked");
};

const renderCards = () => {
  if (cardsGrid.childElementCount === 0) {
    initialCards.forEach((item) => {
      const placeCard = placeCardTemplate
        .querySelector(".elements__element")
        .cloneNode(true);
      placeCard.querySelector(".elements__image").src = item.link;
      placeCard.querySelector(".elements__name").textContent = item.name;
      placeCard
        .querySelector(".elements__heart")
        .addEventListener("click", likePlaceHandler);
      cardsGrid.append(placeCard);
    });
  } else if (cardsGrid.childElementCount < initialCards.length) {
    const placeCard = placeCardTemplate
      .querySelector(".elements__element")
      .cloneNode(true);
    placeCard.querySelector(".elements__image").src = initialCards[0].link;
    placeCard.querySelector(".elements__name").textContent =
      initialCards[0].name;
    placeCard
      .querySelector(".elements__heart")
      .addEventListener("click", likePlaceHandler);

    cardsGrid.prepend(placeCard);
  }
};

editButton.addEventListener("click", showModal);
addNewPlaceButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeEditModal);
popupForm.addEventListener("submit", saveDataHandler);

renderCards();
