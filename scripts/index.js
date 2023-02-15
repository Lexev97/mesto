const editButton = document.querySelector(".profile__edit");
const editModal = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
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
  }
];

function showEditModal() {
  editModal.classList.add("popup__opened");
  nameInput.value = profileName.innerText;
  descriptionInput.value = description.innerText;
}

function closeEditModal() {
  editModal.classList.remove("popup__opened");
}

function saveProfileData(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closeEditModal();
}

editButton.addEventListener("click", showEditModal);
closeButton.addEventListener("click", closeEditModal);
popupForm.addEventListener("submit", saveProfileData);

const renderCards = () => {
  initialCards.map((item) => {
    const placeCard = placeCardTemplate
      .querySelector(".elements__element")
      .cloneNode(true);
    placeCard.querySelector(".elements__image").src = item.link;
    placeCard.querySelector(".elements__name").textContent = item.name;

    cardsGrid.append(placeCard);
  });
};

renderCards();
