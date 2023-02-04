const editButton = document.querySelector(".profile__edit");
const editModal = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const profileName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");

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
